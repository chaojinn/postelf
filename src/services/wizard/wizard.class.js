/* eslint-disable no-unused-vars */
class Service {
  
  constructor (options) {
    this.options = options || {};
    this.coreServiceStarted=false;
    const path = require('path');
    this.scriptName = "["+path.basename(__filename)+"] ";
    
  }
  setup(app) {
    console.log(this.scriptName+"service wizard started")
    this.app = app;
    this.CORE_API_URL  =  'http://localhost:'+app.get("coreport");
  }

  

  async update (id, data, params) {
    //try connect
    console.log(this.scriptName+JSON.stringify(data));
    if(data.cmd=="testDatabase"){
      return this.testDatabase(data.data);
    }
    else if(data.cmd=="testDependency"){
      return this.testDependency(data.data);
    }
    else if(data.cmd=="finishWizard"){
      return this.finishWizard(data.data);
    }
    else if(data.cmd=="getConfig"){
      return this.getConfig();
    }
    else if(data.cmd=="startCoreService"){
      return this.startCoreService(data.data);
    }
  }

  
  
  async testDatabase(data){
    const pg = require('pg');
    var con = new pg.Client({
      host: data.dbAddress,
      port: '5432',
      user: data.dbUSer,
      password: data.dbPassword,
      database: data.dbName
    })
    let success=false;
    let error=null;
    const pConnect=con.connect()
      .then(() => {success=true;})
      .catch((err) => {success=false; error=err; console.error(this.scriptName+'connection error', err.stack);});
    await pConnect;
    if(!success){
      con.end();
      return {code:500, error:error.toString(), stack:error};
    }
    //try create table
    success=false;
    let pQuery = con.query('drop table if exists test')
      .then(() => {success=true;})
      .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
    await pQuery;
    if(!success){
      con.end();
      return {code:500, error:error.toString(), stack:error};
    }
    
    success=false;
    pQuery = con.query('create table test(col1 varchar(10))')
      .then(() => {success=true;})
      .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
    await pQuery;
    if(!success){
      con.end();
      return {code:500, error:error.toString(), stack:error};
    }
    
    
    //try drop table
    success=false;
    pQuery = con.query('drop table test')
      .then(() => {success=true;})
      .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
    await pQuery;
    if(!success){
      con.end();
      return {code:500, error:error.toString(), stack:error};
    }
    
    con.end();
    
    return {code:200};
  }

  async testDependency(data){
    //start core service if not started
    if(!this.coreServiceStarted)
      this.startCoreService(data);
    else
      console.log(this.scriptName+"core service already started, skip");
    
    //check if package is installed
    let pkgDependency=["postgresql","postfix","dovecot","cyrus-sasl","cyrus-sasl-sql"];
    let error=null;
    const util = require('util');
    const exec = util.promisify(require('child_process').exec); 
    let i=0;
    let ret=new Array();
    for (i=0;i<pkgDependency.length;i++) {
      console.log(this.scriptName+"test package "+pkgDependency[i]);
      await exec("rpm -qi "+pkgDependency[i])
      .then((result) => {
        let idx=result.stdout.indexOf("Version     :");
        if(idx==-1)
          ret.push({name:"Package "+pkgDependency[i], error:"not installed"});
        else
          ret.push({name:"Package "+pkgDependency[i]});
        console.log(this.scriptName+"result added:"+ret);
      },(err)=>{
        ret.push({name:"Package "+pkgDependency[i], error:err.toString()});
        error=err; 
        console.error(this.scriptName+'testDependency error:'+err.toString());
      })
      .catch((err) => {
        ret.push({name:"Package "+pkgDependency[i], error:err.toString()});
        error=err; 
        console.error(this.scriptName+'testDependency error:'+err.toString(), err.stack);
      });
    }
    console.log(this.scriptName+"package test done");
    
    //check file path access
    let paths=[data.baseMailFolder];
    let pathResult=await this.testAccess(paths);
    for(i=0;i<pathResult.length;i++){
      if(pathResult[i].result==0){
        ret.push({name:"Path "+pathResult[i].path});
      }
      else{
        ret.push({name:"Path "+pathResult[i].path,error:"access denied"});
      }
    }
    console.log(this.scriptName+"access test done");
    
    //check if service is enabled
    pkgDependency=["postgresql","postfix","dovecot","saslauthd"];
    const systemctl = require('systemctl')
    for(i=0;i<pkgDependency.length;i++)
    {
      let serviceEnabled=false;
      let jobService=systemctl.isEnabled('postfix').then(enabled => {
        serviceEnabled=enabled;
      })
      await jobService;
      if(serviceEnabled)
        ret.push({name:"Service "+pkgDependency[i]});
      else
        ret.push({name:"Service "+pkgDependency[i],error:"no enabled"});
    }
    console.log(this.scriptName+"access service done");
    console.log(this.scriptName+"result returned:"+ret);
    return ret;
  }

  async testAccess(paths){
    console.log(this.scriptName+paths);
    const fs = require('fs');
    let ret=[];
    let i=0;
    for (i=0;i<paths.length;i++) {
      let path=paths[i];
      try {
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
        ret.push({path:path,result:0});
      } catch (err) {
        ret.push({path:path,result:-1});
      }
    }
    return ret;
  }
  
  async finishWizard(data){
    if(!this.coreServiceStarted){
      return {code:500,error:"core service is not started"};
    }
    //database tables
    let ret = await this.initDB(data);
    if(ret.error)
      return ret;
    if(!data.selfsign){
      data.selfsign={
        countryName:"AU",
        stateOrProvinceName:"VIC",
        localityName:"MEL",
        organizationName:"BYTESTUDIO",
        commonName:"POSTELF.COM",
        emailAddress:"ADMIN@BYTESTUDIO.COM.AU"
      };
    }
    //generate ssl cert files
    ret = await this.generateKeyCert(data);
    if(ret.error)
      return ret;
    ret= await this.generateConfigFile(data);
    if(ret.error)
      return ret;
    
    ret= await this.restartService(data);
    
    let i=0;
    let restartErr='';
    for(i=0;i<ret.length;i++)
    {
      let r=ret[i];
      if(r.error)
        restartErr+=r.error+".";
    }
    
    if(restartErr.length>0)
      return {code:500,error:restartErr};
    const fs = require('fs');
    let pjson = require(__dirname+'/../../../package.json');
    let path=__dirname+"/../../../config/installed.json";
    console.log(this.scriptName+"write install record:"+pjson.version+","+path);
    let installed={version:pjson.version,
      dbAddress:data.dbAddress,
      dbUSer:data.dbUSer,
      dbPassword:data.dbPassword,
      dbName:data.dbName
    };
    fs.writeFileSync(path,JSON.stringify(installed, null, 2),{mode:0o744});
    return {code:200};
    //postfix config file
    //sasl2 config
    //dovecot configureation
  }
  
  async initDB(config){
    const pg = require('pg');
    var con = new pg.Client({
      host: config.dbAddress,
      port: '5432',
      user: config.dbUSer,
      password: config.dbPassword,
      database: config.dbName
    })
    try{
      //connect to db
      let success=false;
      let error=null;
      const pConnect=con.connect()
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'connection error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'connection error', err.stack);});
      await pConnect;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"connected to db");
      //try create table admin
      success=false;
      let pQuery = con.query("DROP TABLE IF EXISTS admin")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      
      success=false;
      pQuery = con.query('CREATE TABLE IF NOT EXISTS admin(\r\n'+
        "id serial NOT NULL PRIMARY KEY,\r\n"+
        "username varchar(255) NOT NULL default '' UNIQUE,\r\n"+
        "password varchar(255) NOT NULL default '' ,\r\n"+
        "created timestamp NOT NULL default '1970-01-01 00:00:00',\r\n"+
        "modified timestamp NOT NULL default '1970-01-01 00:00:00',\r\n"+
        "active smallint NOT NULL default '1')")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"admin table created");
      //try create table domain
      success=false;
      pQuery = con.query("DROP TABLE IF EXISTS domain")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      
      //try create table domain
      success=false;
      pQuery = con.query('CREATE TABLE IF NOT EXISTS domain(\r\n'+
        "domain varchar(255) NOT NULL default '' PRIMARY KEY,\r\n"+
        "description varchar(255) NOT NULL default '',\r\n"+
        "mailboxes integer NOT NULL default '0',\r\n"+
        "maxquota integer NOT NULL default '0',\r\n"+
        "created timestamp NOT NULL default '1970-01-01 00:00:00',\r\n"+
        "modified timestamp NOT NULL default '1970-01-01 00:00:00',\r\n"+
        "active smallint NOT NULL default '1')")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"domain table created");
      //try create table mailbox
      success=false;
      pQuery = con.query("DROP TABLE IF EXISTS mailbox")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      success=false;
      pQuery = con.query('CREATE TABLE IF NOT EXISTS mailbox(\r\n'+
        "username varchar(255) NOT NULL default '' PRIMARY KEY,\r\n"+
        "password varchar(255) NOT NULL default '',\r\n"+
        "name varchar(255) NOT NULL default '',\r\n"+
        "quota integer NOT NULL default '0',\r\n"+
        "domain varchar(255) NOT NULL default '',\r\n"+
        "created timestamp NOT NULL default '1970-01-01 00:00:00',\r\n"+
        "modified timestamp NOT NULL default '1970-01-01 00:00:00',\r\n"+
        "active smallint NOT NULL default '1')")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"mailbox table created");
      //create record for admin login
      success=false;
      pQuery = con.query("INSERT INTO admin (username,password,created,modified,active) VALUES ($1,$2,$3,$4,$5)"
        ,[config.loginName,config.password,"now()","now()",1])
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"admin record created");
      //create record for domain
      success=false;
      pQuery = con.query("INSERT INTO domain (domain,created,modified,active) VALUES ($1,$2,$3,$4)"
        ,[config.emailDomain,"now()","now()",1])
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"domain record created");
      //create record for mailbox
      success=false;
      pQuery = con.query("INSERT INTO mailbox (\"username\",password,domain,created,modified,active) VALUES ($1,$2,$3,$4,$5,$6)"
        ,[config.emailUser,config.emailPassword,config.emailDomain,"now()","now()",1])
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"mailbox record created");
      
      //try create table config
      success=false;
      pQuery = con.query("DROP TABLE IF EXISTS config")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      
      success=false;
      pQuery = con.query('CREATE TABLE IF NOT EXISTS config(\r\n'+
        "conf_key varchar(255) NOT NULL PRIMARY KEY,\r\n"+
        "conf_value varchar(1024) NOT NULL default '' )")
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"config table created");
      
      success=false;
      pQuery = con.query("INSERT INTO config (conf_key,conf_value) VALUES ($1,$2)"
        ,["baseMailFolder",config.baseMailFolder])
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      
      success=false;
      pQuery = con.query("INSERT INTO config (conf_key,conf_value) VALUES ($1,$2)"
        ,["runasuser",config.runasuser])
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      
      success=false;
      pQuery = con.query("INSERT INTO config (conf_key,conf_value) VALUES ($1,$2)"
        ,["sudoPassword",config.sudoPassword])
        .then(() => {success=true;},(err)=>{success=false; error=err; console.error(this.scriptName+'query error', err.stack);})
        .catch((err) => {success=false; error=err; console.error(this.scriptName+'query error', err.stack);});
      await pQuery;
      if(!success){
        con.end();
        return {code:500, error:error.toString(), stack:error};
      }
      console.log(this.scriptName+"config records created");
      
      //return OK
      con.end();
      return {code:200};
    }
    catch(err){
      con.end();
      return {code:500,error:err.toString()};
    }
    finally{
      con.end();
    }
  }
  
  async createFolderAsRoot(path,mode){
    const rp = require('request-promise');
    const options = {
      method: 'PUT',
      uri: this.CORE_API_URL+"/postelf-core",
      body: {
        cmd:"createFolder",
        data:{path:path,mode:mode}
        },
      json: true 
    };
    return rp(options)
    .then( (res) => {
      if(res.error){
        console.error(this.scriptName+"createFolderAsRoot:"+path+" error:"+res.error);
        this.error=err.toString();
      }
    },(err)=>{
      console.error(this.scriptName+"createFolderAsRoot:"+path+" error:"+err.toString());
      this.error=err.toString();
    })
    .catch( (err) =>{
      console.error(this.scriptName+"createFolderAsRoot:"+path+"error:"+err.toString());
      this.error=err.toString();
    });
  }
  
  async writeFileAsRoot(path,content,mode){
    const rp = require('request-promise');
    const options = {
      method: 'PUT',
      uri: this.CORE_API_URL+"/postelf-core",
      body: {
        cmd:"writeFile",
        data:{path:path,content:content,mode:mode}
        },
      json: true 
    };
    return rp(options)
    .then( (res) => {
      if(res.error){
        console.error(this.scriptName+"writeFileAsRoot:"+path+" error:"+res.error);
        this.error=res.error.toString();
      }
    },(err)=>{
      console.error(this.scriptName+"writeFileAsRoot:"+path+" error:"+err.toString());
      this.error=err.toString();
    })
    .catch( (err) =>{
      console.error(this.scriptName+"writeFileAsRoot:"+path+"error:"+err.toString());
      this.error=err.toString();
    });
  }
  
  async restartServiceAsRoot(service){
    const rp = require('request-promise');
    const options = {
      method: 'PUT',
      uri: this.CORE_API_URL+"/postelf-core",
      body: {
        cmd:"restartService",
        data:{service:service}
        },
      json: true 
    };
    return rp(options)
    .then( (res) => {
      if(res.error){
        console.error(this.scriptName+"restartServiceAsRoot:"+path+" error:"+res.error);
        this.error=res.error.toString();
      }
    },(err)=>{
      console.error(this.scriptName+"restartServiceAsRoot:"+path+" error:"+err.toString());
      this.error=err.toString();
    })
    .catch( (err) =>{
      console.error(this.scriptName+"restartServiceAsRoot:"+path+"error:"+err.toString());
      this.error=err.toString();
    });
  }
  
  async generateKeyCert(config){
    const fs = require('fs');
    const node_openssl = require('node-openssl-cert');
    const openssl = new node_openssl();
    let pKey='';
    let pCsr='';
    let pCrt='';
    let error = undefined;
    
    try{
      //check if cert folder exists
      if(!fs.existsSync("/etc/postfix/certs")){
        console.log(this.scriptName+"cert folder not exist, create new one");
        let jobMK=this.createFolderAsRoot("/etc/postfix/certs",0o755);
        await jobMK;
        if(jobMK.error){
          return {code:500,error:jobMK.error};
        }
      }
      //create ssl key
      let jobKey = new Promise((resolve, reject) => {
        openssl.generateRSAPrivateKey({}, function(err, key, cmd) {
          if (err) {
            error=err;
            reject(err);
          }
          pKey=key;
          return resolve([cmd,key])
        });
      }).then( async ([cmd,key])=>{},err=>{error=err;});
      await jobKey;
      if(error){
        return {code:500,error:error.toString()};
      }
      //write ssl key to file
      let jobWK=this.writeFileAsRoot("/etc/postfix/certs/server.key",pKey,0o744);
      await jobWK;
      if(jobWK.error){
        return {code:500,error:jobWK.error};
      }
      console.log(this.scriptName+"key created");
      
      //create csr
      let csroptions = {
        hash: 'sha256',
        subject: {
            countryName: config.selfsign.countryName,
            stateOrProvinceName: config.selfsign.stateOrProvinceName,
            localityName: config.selfsign.localityName,
            postalCode: 'N/A',
            streetAddress: 'N/A',
            organizationName: config.selfsign.organizationName,
            organizationalUnitName: 'N/A',
            commonName: [
              config.selfsign.commonName
            ],
            emailAddress: config.selfsign.emailAddress
        }
      }
      
      let jobCsr = new Promise((resolve, reject) => {
        openssl.generateCSR(csroptions, pKey, '', function(err, csr, cmd) {
          if(err) {
            error=err;
            return reject(err)
          } else {
            pCsr=csr;
            return resolve([cmd.command,csr,cmd.files.config])
          }
        });
      });
      await jobCsr;
      if(error){
        return {code:500,error:error.toString()};
      }
      
      //write csr to file
      let jobWCSR=this.writeFileAsRoot("/etc/postfix/certs/server.csr",pCsr,0o744);
      await jobWCSR;
      if(jobWCSR.error){
        return {code:500,error:jobWCSR.error};
      }
      console.log(this.scriptName+"csr created");
      
      //create crt
        var cacsroptions = {
        hash: 'sha256',
        days: 240,
        subject: {
          countryName: config.selfsign.countryName,
          stateOrProvinceName: config.selfsign.stateOrProvinceName,
          localityName: config.selfsign.localityName,
          postalCode: 'N/A',
          streetAddress: 'N/A',
          organizationName: config.selfsign.organizationName,
          organizationalUnitName: 'N/A',
          commonName: [
            config.selfsign.commonName
          ]
        },
      }
      
      let jobSign = new Promise((resolve, reject) => {
        openssl.selfSignCSR(pCsr, cacsroptions, pKey, '', function(err, cacrt, cmd) {
          if(err) {
            error=err;
            return reject(err)
          } else {
            pCrt=cacrt;
            return resolve([cmd,cacrt])
          }
        });
      });
      await jobSign;
      if(error){
        return {code:500,error:error.toString()};
      }
      
      //write crt to file
      let jobWCRT=this.writeFileAsRoot("/etc/postfix/certs/server.crt",pCrt,0o744);
      await jobWCRT;
      if(jobWCRT.error){
        return {code:500,error:jobWCRT.error};
      }
      console.log(this.scriptName+"crt created");
    }
    catch(err){
      console.log("catch");
      error=err;
      return {code:500,error:error};
    }
    return {code:200};
  }

  async generateConfigFile(config){
    const fs = require('fs');
    try{
      const { exec } = require('child_process');
      let uid='';
      let gid='';
      let error='';
      let jobID = new Promise((resolve, reject) => {
        exec('id -u '+config.runasuser, (err, stdout, stderr) => {
          if (err) {
            error=err;
            reject(err);
            return;
          }
          if(stderr.length>0){
            error=stderr;
            reject(stderr);
            return;
          }
          uid=stdout.replace("\n","");
          resolve(stdout);
        }); 
      }).then((stdout)=>{},(err)=>{}).catch((err)=>{});;
      
      await jobID;
      console.log(this.scriptName+"uid is:"+uid);
      jobID = new Promise((resolve, reject) => {
        exec('id -g '+config.runasuser, (err, stdout, stderr) => {
          if (err) {
            error=err;
            reject(err);
            return;
          }
          if(stderr.length>0){
            error=stderr;
            reject(stderr);
            return;
          }
          gid=stdout.replace("\n","");
          resolve(stdout);
        }); 
      }).then((stdout)=>{},(err)=>{}).catch((err)=>{});;
      
      await jobID;
      console.log(this.scriptName+"gid is:"+gid);
      if(error.length>0)
        return {code:500,error:error};
      //create sasl2 config
      let temp=this.app.get('sasl_template').join("\n");
      temp=temp.replace("[[@dbAddress@]]",config.dbAddress);
      temp=temp.replace("[[@dbUSer@]]",config.dbUSer);
      temp=temp.replace("[[@dbPassword@]]",config.dbPassword);
      temp=temp.replace("[[@dbName@]]",config.dbName);
      //write crt to file
      let jobWsasl2=this.writeFileAsRoot("/etc/sasl2/smtpd.conf",temp,0o744);
      await jobWsasl2;
      if(jobWsasl2.error){
        return {code:500,error:jobWsasl2.error};
      }
      console.log(this.scriptName+"sasl2 config created");
      
      //create dovecot config
      temp=this.app.get('dovecot_template').join("\n");
      
      temp=temp.replace("[[@baseMailFolder@]]",config.baseMailFolder);
      let jobWdovecot=this.writeFileAsRoot("/etc/dovecot/dovecot.conf",temp,0o744);
      await jobWdovecot;
      if(jobWdovecot.error){
        return {code:500,error:jobWdovecot.error};
      }
      console.log(this.scriptName+"dovecot config created");
      
      temp=this.app.get('dovecot_auth_template').join("\n");
      temp=temp.replace("[[@baseMailFolder@]]",config.baseMailFolder);
      temp=temp.replace("[[@baseMailFolder@]]",config.baseMailFolder); //need to do it twice becasue there are 2 instances need to be replaced
      temp=temp.replace("[[@dbAddress@]]",config.dbAddress);
      temp=temp.replace("[[@dbUSer@]]",config.dbUSer);
      temp=temp.replace("[[@dbPassword@]]",config.dbPassword);
      temp=temp.replace("[[@dbName@]]",config.dbName);
      temp=temp.replace("[[@uid@]]",uid);
      temp=temp.replace("[[@gid@]]",gid);
      let jobWdovecot2=this.writeFileAsRoot("/etc/dovecot/dovecot-sql.conf",temp,0o744);
      await jobWdovecot2;
      if(jobWdovecot2.error){
        return {code:500,error:jobWdovecot2.error};
      }
      console.log(this.scriptName+"dovecot auth config created");
      
      temp=this.app.get('pfx_virtual_template').join("\n");
      temp=temp.replace("[[@dbAddress@]]",config.dbAddress);
      temp=temp.replace("[[@dbUSer@]]",config.dbUSer);
      temp=temp.replace("[[@dbPassword@]]",config.dbPassword);
      temp=temp.replace("[[@dbName@]]",config.dbName);
      let jobWpfx1=this.writeFileAsRoot("/etc/postfix/virtual.cf",temp,0o744);
      await jobWpfx1;
      if(jobWpfx1.error){
        return {code:500,error:jobWpfx1.error};
      }
      console.log(this.scriptName+"postfix virtual config created");
      
      temp=this.app.get('pfx_vmailbox_template').join("\n");
      temp=temp.replace("[[@dbAddress@]]",config.dbAddress);
      temp=temp.replace("[[@dbUSer@]]",config.dbUSer);
      temp=temp.replace("[[@dbPassword@]]",config.dbPassword);
      temp=temp.replace("[[@dbName@]]",config.dbName);
      let jobWpfx2=this.writeFileAsRoot("/etc/postfix/vmailbox.cf",temp,0o744);
      await jobWpfx2;
      if(jobWpfx2.error){
        return {code:500,error:jobWpfx2.error};
      }
      console.log(this.scriptName+"postfix vmailbox config created");
      
      temp=this.app.get('pfx_main').join("\n");
      temp=temp.replace("[[@uid@]]",uid);
      temp=temp.replace("[[@gid@]]",gid);
      temp=temp.replace("[[@baseMailFolder@]]",config.baseMailFolder);
      let jobWpfx3=this.writeFileAsRoot("/etc/postfix/main.cf",temp,0o744);
      await jobWpfx3;
      if(jobWpfx3.error){
        return {code:500,error:jobWpfx3.error};
      }
      console.log(this.scriptName+"postfix main config created");
      
      temp=this.app.get('pfx_master').join("\n");
      let jobWpfx4=this.writeFileAsRoot("/etc/postfix/master.cf",temp,0o744);
      await jobWpfx4;
      if(jobWpfx4.error){
        return {code:500,error:jobWpfx4.error};
      }
      console.log(this.scriptName+"postfix master config created");
    }
    catch(err)
    {
      return {code:500,error:err.toString()};
    }
    
    return {code:200};
    
  }

  async restartService(config){
    let arrServices=["saslauthd","dovecot","postfix",];
    const { exec } = require('child_process');
    let arrRet=[];
    let i=0;
    for(i=0;i<arrServices.length;i++){
      let service=arrServices[i];
      let jobRestart=this.restartServiceAsRoot(service);
      await jobRestart;
      if(jobRestart.error){
        arrRet.push({cmd:'service restart '+service, error:jobRestart.toString()});
      }
      else{
        arrRet.push({cmd:'service restart '+service});
      }
      console.log(this.scriptName+service+" restarted");
    }
    return arrRet;
  }
  
  async getConfig()
  {
    return new Promise((resolve, reject) => {
      const fs = require('fs');
      let path=__dirname+"/../../../config/installed.json";
      if(fs.existsSync(path))
        resolve({code:200,installed:"yes"});
      else
        resolve({code:200,installed:"no"});
    }).then((ret)=>{
      console.log(this.scriptName+ret);
      return ret;});
  }
  
  async startCoreService(config)
  {
    return new Promise((resolve, reject) => {
      try{
        var sudo = require('./../../sudojs');
        sudo.setPassword(config.sudoPassword);
        sudo.check((result)=>{
            if(!result)
              reject({code:500,error:"wrong sudo password"});
        });
        var options = {check: true, withResult: true};
        console.log(this.scriptName+__dirname +'/../coreservice.js');
        var command = ['node',  __dirname +'/../coreservice.js'];
        sudo.exec(command, options, function(err, pid, result) {
            console.log("err:"+err+",pid:"+pid+",result:"+result); 
        });
        resolve({code:200});
        console.log(this.scriptName+"core service started");
        this.coreServiceStarted=true;
      }
      catch(err)
      {
        console.log(this.scriptName+"failed to start core service");
        console.log(this.scriptName+err.toString());
        reject({code:500,error:err.toString()});
      }
    }).then((ret)=>{
      console.log(this.scriptName+ret);
      return ret;},
      (err)=>{
      console.log(this.scriptName+err);
      return err;});
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
