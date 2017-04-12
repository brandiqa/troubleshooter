'use strict';

const user = require('./user/user.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(user);
};
