'use strict';

// Initializes the `user` service on path `/user`
const createService = require('feathers-mongoose');
const createModel = require('../../models/user.model');
const hooks = require('./user.hooks');
const filters = require('./user.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'user',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('user');

  service.hooks(hooks);

  // console.log('lets create admin');

  const adminUser = {
    firstName: 'Admin',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin'
  };

  service.find({})
    .then(function(response) {
      if(response.data.length === 0) {
        service.create(adminUser)
          .then(function(){
            console.info('Default Admin User Created...'); // eslint-disable-line no-console
          });
      }
    });

  if (service.filter) {
    service.filter(filters);
  }
};
