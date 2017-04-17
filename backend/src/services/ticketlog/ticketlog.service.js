'use strict';

// Initializes the `ticketlog` service on path `/ticketlogs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/ticketlog.model');
const hooks = require('./ticketlog.hooks');
const filters = require('./ticketlog.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'ticketlog',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ticketlogs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ticketlogs');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
