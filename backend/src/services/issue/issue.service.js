'use strict';

// Initializes the `issue` service on path `/issues`
const createService = require('feathers-mongoose');
const createModel = require('../../models/issue.model');
const hooks = require('./issue.hooks');
const filters = require('./issue.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'issue',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/issues', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('issues');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
