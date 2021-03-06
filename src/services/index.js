const wizard = require('./wizard/wizard.service.js');
const users = require('./users/users.service.js');
const systemservices = require('./systemservices/systemservices.service.js');
const systemstat = require('./systemstat/systemstat.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(wizard);
  app.configure(users);
  app.configure(systemservices);
  app.configure(systemstat);
};
