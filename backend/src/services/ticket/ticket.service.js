'use strict';

// Initializes the `ticket` service on path `/tickets`
const createService = require('feathers-mongoose');
const createModel = require('../../models/ticket.model');
const hooks = require('./ticket.hooks');
const filters = require('./ticket.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const events = ['ticketAssigned'];

  const options = {
    name: 'ticket',
    Model,
    paginate,
    events
  };

  // Initialize our service with any options it requires
  app.use('/tickets', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tickets');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
