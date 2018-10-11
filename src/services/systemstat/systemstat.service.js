// Initializes the `systemstat` service on path `/systemstat`
const createService = require('./systemstat.class.js');
const hooks = require('./systemstat.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/systemstat', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('systemstat');

  service.hooks(hooks);
};
