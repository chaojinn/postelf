const wizard = require('./wizard/wizard.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(wizard);
  app.configure(users);
};
