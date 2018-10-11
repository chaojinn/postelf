/* eslint-disable no-unused-vars */
class Service {
  
  setup(app) {
    this.app = app;
    this.CORE_API_URL  =  'http://localhost:'+app.get("coreport");
  }
  
  constructor (options) {
    this.options = options || {};
    const path = require('path');
    this.scriptName = "["+path.basename(__filename)+"] ";
    this.pkgDependency=["postgresql","postfix","dovecot","saslauthd"];
    this.systemctl = require('../../utils/systemctl');
  }

  async find (params) {
    let i=0;
    let ret=Array();
    for(i=0;i<this.pkgDependency.length;i++)
    {
      let serviceEnabled=false;
      let jobService=this.systemctl.isActive(this.pkgDependency[i]).then(active => {
        serviceEnabled=active;
      })
      await jobService;
      if(serviceEnabled)
        ret.push({name:this.pkgDependency[i]});
      else
        ret.push({name:this.pkgDependency[i],error:"not active"});
    }
    console.log(this.scriptName+"access service done");
    return ret;
  }

  async update (id, data, params) {
    if(this.pkgDependency.indexOf(id)==-1)
      return {code:500, error:"service "+id+" not found"};
    let jobRestart=this.restartServiceAsRoot(id);
    await jobRestart;
    if(jobRestart.error){
      return {code:500, error:jobRestart.error.toString()};
    }
    return {code:200};
  }
  
  async restartServiceAsRoot(service){
    console.log("restartServiceAsRoot called:"+service);
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
      console.log("core service request responded:"+JSON.stringify(res));
      if(res.error){
        console.error(this.scriptName+"restartServiceAsRoot:"+service+" error:"+res.error);
        this.error=res.error.toString();
      }
    },(err)=>{
      console.error(this.scriptName+"restartServiceAsRoot:"+service+" error:"+err.toString());
      this.error=err.toString();
    })
    .catch( (err) =>{
      console.error(this.scriptName+"restartServiceAsRoot:"+service+"error:"+err.toString());
      this.error=err.toString();
    });
  }

  
  
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
