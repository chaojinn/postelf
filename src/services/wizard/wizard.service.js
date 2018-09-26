// Initializes the `Wizard` service on path `/wizard`
const createService = require('./wizard.class.js');
const hooks = require('./wizard.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/wizard-controller', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('wizard-controller');

  service.hooks(hooks);
};
