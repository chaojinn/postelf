/* eslint-disable no-unused-vars */
class Service {
  constructor () {
    const fs = require('fs');
    const path = require('path');
    const { Pool } = require('pg')
    this.id="userId";
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
  
  async find(params) {
    let pConnect=undefined;
    try{
      pConnect=await this.dbPool.connect();
      const res = await pConnect.query('SELECT id, username , password FROM admin WHERE username=$1 AND active=1', [params.query.email]);
      if(res.rows.length){
        return [{userId:res.rows[0].id, email:res.rows[0].username,password:res.rows[0].password}];
      }
      else{
        return [];
      }
    }
    catch(err){
      console.error(this.scriptName+"[find] error:"+err.toString());
      return [];
    }
    finally{
      if(pConnect)
        pConnect.release();
    }
    //return [{email:"123@123",password:"$2a$04$YMIz1.dY/27lGbcewng8BOjZNKmGHXWL7mRXwy3uHaMQdL/ynlJ3m"}];
  }
  
  async get (id, params) {
    let pConnect=undefined;
    try{
      pConnect=await this.dbPool.connect();
      const res = await pConnect.query('SELECT id, username , password FROM admin WHERE id=$1 AND active=1 ', [id]);
      if(res.rows.length){
        return {userId:res.rows[0].id, email:res.rows[0].username,password:res.rows[0].password};
      }
      else{
        return {error:"user not found"};
      }
    }
    catch(err){
      console.error(this.scriptName+"[find] error:"+err.toString());
      return {error:err.toString()};
    }
    finally{
      if(pConnect)
        pConnect.release();
    }
  }
  
  async create (data, params) {
    
    console.log("users post");
    console.log("data:"+JSON.stringify(data));
    console.log("params:"+JSON.stringify(params));
    return data;
  }
  
  async remove (id, params) {
    console.log("users delete");
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
