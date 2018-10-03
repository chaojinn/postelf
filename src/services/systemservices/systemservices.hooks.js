const authentication = require('@feathersjs/authentication');
const path = require('path');
const scriptName = "["+path.basename(__filename)+"] ";

const checkCoreRunning = () => {
  return async context => {
    if(!context.app.coreServiceStarted)
    {
      console.log(scriptName+"core service not started, start now");
      context.app.startCoreService();
    }
    return context;
  }
} ;


module.exports = {
  
  before: {
    all: [authentication.hooks.authenticate('jwt'),checkCoreRunning()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
