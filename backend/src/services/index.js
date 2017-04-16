'use strict';

const user = require('./user/user.service.js');

const category = require('./category/category.service.js');

const ticket = require('./ticket/ticket.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(user);
  app.configure(category);
  app.configure(ticket);
};
