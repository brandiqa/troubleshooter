'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['admin','agent'],
    fieldName: 'role',
    idField: '_id',
    ownerField: 'postedBy',
    owner: true
  })
];

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [...restrict],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
