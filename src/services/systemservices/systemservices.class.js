/* eslint-disable no-unused-vars */
class Service {
  
  
  constructor (options) {
    this.options = options || {};
    const path = require('path');
    this.scriptName = "["+path.basename(__filename)+"] ";
  }

  async find (params) {
    return [{name:"xxx",status:"ok"}];
  }

  
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
