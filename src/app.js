
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');

const app = express(feathers());



// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());



app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));


// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)

// Setup authentication
app.configure(authentication({
  name: 'local', // the name to use when invoking the authentication Strategy
  jwt: {
    issuer: 'bytestudio',
    audience: 'clients',
    subject: 'anonymous'
  },
  entity: 'user', // the entity that you're comparing username/password against
  service: 'users', // the service to look up the entity
  usernameField: 'email', // key name of username field
  passwordField: 'password', // key name of password field
  entityUsernameField: 'email', // key name of the username field on the entity (defaults to `usernameField`) 
  entityPasswordField: 'password', // key name of the password on the entity (defaults to `passwordField`) 
  passReqToCallback: true, // whether the request object should be passed to `verify`
  session: false, // whether to use sessions,
  secret:'cao198',//jalksdjfl;kasjdsf
}));
app.configure(jwt());
app.configure(local());
app.service('authentication').hooks({
  before: {
    create: [
      authentication.hooks.authenticate(['local', 'jwt'])
    ]
  }
});


app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

//setup core service
app.coreServiceStarted=false;
app.startCoreService = async function (){
  return new Promise((resolve, reject) => {
    try{
      console.log("[app.js] "+"starting core service");
      const fs = require('fs');
      const sudo = require('./sudojs');
      //check if config file exists, if not return error
      let fPath=__dirname+"/../config/installed.json";
      console.log("fPath:"+fPath);
      if(!fs.existsSync(fPath)){
        console.log("[app.js] "+"installed.json not found");
        reject({code:500,error:"installed.json not found"});
        return;
      }
      //read sudo password from config file
      
      let data=fs.readFileSync(fPath);
      let config = JSON.parse(data);
      
      //start core service as root
      sudo.setPassword(config.sudoPassword);
      sudo.check((result)=>{
          if(!result)
            reject({code:500,error:"wrong sudo password"});
      });
      var options = {check: true, withResult: true};
      
      var command = ['node',  __dirname +'/services/coreservice.js'];
      sudo.exec(command, options, function(err, pid, result) {
          console.log("[app.js] err:"+err+",pid:"+pid+",result:"+result); 
      });
      app.coreServiceStarted=true;
      resolve({code:200});
      console.log("[app.js] "+"core service started");
    }
    catch(err)
    {
      console.log("[app.js] "+"failed to start core service");
      console.log("[app.js] "+err.toString());
      reject({code:500,error:err.toString()});
    }
  });
}

app.hooks(appHooks);

module.exports = app;
console.log("server started");


