const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const app = express(feathers());
const path = require('path');
const scriptName = path.basename(__filename);

app.configure(configuration());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Turn on JSON body parsing for REST services
app.use(express.json())
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());

//postelf core service to perform actions which needs "sudo" privilege 
app.use('postelf-core', {
  
  createFolderAllowPath:["/etc/postfix/certs"],
  writeFileAllowPath:["/etc/sasl2/smtpd.conf","/etc/dovecot/dovecot.conf","/etc/dovecot/dovecot-sql.conf","/etc/postfix/virtual.cf","/etc/postfix/vmailbox.cf","/etc/postfix/main.cf","/etc/postfix/master.cf","/etc/postfix/certs/server.key","/etc/postfix/certs/server.csr","/etc/postfix/certs/server.crt"],
  restartServiceAllowService:["postfix","dovecot","saslauthd"],
  async update (id, data, params) {
     console.log("["+scriptName+"] request received:"+JSON.stringify(data));
      if(data.cmd=="createFolder"){
        return this.createFolder(data.data);
      }
      else if(data.cmd=="writeFile"){
        return this.writeFile(data.data);
      }
      else if(data.cmd=="restartService"){
        return this.restartService(data.data);
      }
  },
  
  async createFolder(data){
    console.log("["+scriptName+"] createFolder");
    const fs = require('fs');
    try{
      if(!this.createFolderAllowPath.find((el) => {
        return el==data.path;
      }))
        return {code:500,error:"path "+data.path+" is not allowed to be created"};
      if(!fs.existsSync(data.path))
        fs.mkdirSync(data.path,data.mode);
      return {code:200};
    }
    catch (err) {
      return {code:500,error:err.toString()};
    }
  },
  
  async writeFile(data){
    console.log("["+scriptName+"] writeFile");
    const fs = require('fs');
    try{
      if(!this.writeFileAllowPath.find((el) => {
        return el==data.path;
      }))
        return {code:500,error:"path "+data.path+" is not allowed to be created"};
      fs.writeFileSync(data.path,data.content,{mode:data.mode});
      return {code:200};
    }
    catch (err) {
      return {code:500,error:err.toString()};
    }
  },
  
  async restartService(data){
    const { exec } = require('child_process');
    if(!this.restartServiceAllowService.find((el) => {
        return el==data.service;
      }))
        return {code:500,error:"service "+data.service+" is not allowed to be restarted"};
    let error=undefined;
    let jobRestart = new Promise((resolve, reject) => {
      exec('service '+data.service+' restart', (err, stdout, stderr) => {
        if (err) {
          console.log("["+scriptName+"] err:"+err);
          error=err;
          reject(err);
          return;
        }
        if(stderr.length>0){
          resolve(stderr);
          return;
        }
        resolve(stdout);
      }); 
    }).then((stdout)=>{},(err)=>{}).catch((err)=>{});;
    
    await jobRestart;
    
    console.log("["+scriptName+"] service:"+data.service+" restarted");
    if(!error)
      return {code:200};
    else
      return {code:500, error:error};
  },
});
app.listen(app.get("coreport"));
console.log("["+scriptName+"] core service started");
