'use strict';

// Initializes the `comment` service on path `/comments`
const createService = require('feathers-mongoose');
const createModel = require('../../models/comment.model');
const hooks = require('./comment.hooks');
const filters = require('./comment.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'comment',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/comments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comments');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
