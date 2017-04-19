'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToRoles } = require('feathers-authentication-hooks');
const local = require('feathers-authentication-local');

const restrict = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['admin'],
    fieldName: 'role',
    idField: '_id',
    ownerField: '_id',
    owner: true
  })
];

const restrictToAdmin = restrictToRoles({
  roles: ['admin'],
  fieldName: 'role',
});

const restrictRoleField = () => {
  return hook => {
    if(hook.params.user.role !== 'admin') {
      delete hook.data.role;
    }
    return Promise.resolve(hook);
  };
};

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ local.hooks.hashPassword(), restrictToAdmin ],
    update: [ ...restrict ],
    patch: [ ...restrict, restrictRoleField() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
