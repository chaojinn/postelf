/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    
    const fs = require('fs');
    const path = require('path');
    const { Pool } = require('pg')
    this.scriptName = "["+path.basename(__filename)+"] ";
    let fPath=__dirname+"/../../../config/installed.json";
    if(fs.existsSync(fPath)){
      let data=fs.readFileSync(fPath);
      this.dbConfig = JSON.parse(data);
      this.dbPool = new Pool({
        host: this.dbConfig.dbAddress,
        port: '5432',
        user: this.dbConfig.dbUSer,
        password: this.dbConfig.dbPassword,
        database: this.dbConfig.dbName,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      })
    }
    else{
      console.log(this.scriptName+" file:"+fPath+" does not exist");
    }
  }

  

  async get (id, params) {
    if(id=='diskusage'){
      return this.getDiskUsage();
    }
    if(id=="emailusage"){
      return this.getEmailStat();
    }
  }

  async getDiskUsage(){
    const disk = require('diskusage');
    const os = require('os');
    try {
      const getSize = require('get-folder-size');
      let ret={};
      let jobGetSize=new Promise((resolve, reject) => {
        getSize("/var/mailboxes", (err, size) => {
          if (err) { 
            reject(err); 
          }
          ret.folderSize=size;
          resolve(size);
        });
      });
      await jobGetSize;
      

      let info = disk.checkSync("/var/mailboxes");
      ret.totalFree=info.free;
      return {code:200, result:ret};
    }
    catch (err) {
      return {code:500, error:err.toString()};
    }
  }
  
  async getEmailStat(){
    let pConnect=undefined;
    try{
      let ret={
        domains:0,
        mailboxes:0
      };
      pConnect=await this.dbPool.connect();
      let res = await pConnect.query('SELECT count(1) as cnt from domain where active=1');
      if(res.rows.length){
        ret.domains=res.rows[0].cnt;
      }
      else{
        return {code:500,error:"failed to count domains"};
      }
      res = await pConnect.query('SELECT count(1) as cnt from mailbox where active=1');
      if(res.rows.length){
        ret.mailboxes=res.rows[0].cnt;
      }
      else{
        return {code:500,error:"failed to count mailboxes"};
      }
      return {code:200, result:ret};
    }
    catch(err){
      console.error(this.scriptName+"[find] error:"+err.toString());
      return {code:500, error:err.toString()};
    }
    finally{
      if(pConnect)
        pConnect.release();
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
