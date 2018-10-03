// Initializes the `systemservices` service on path `/systemservices`
const createService = require('./systemservices.class.js');
const hooks = require('./systemservices.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/systemservices', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('systemservices');

  service.hooks(hooks);
};
