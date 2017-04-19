'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const  { restrictToRoles } = require('feathers-authentication-hooks');
const hooks = require('feathers-authentication-hooks');
const { iffElse } = require('feathers-hooks-common');


const restrictAdminOrAgent = [
  restrictToRoles({
    roles: ['admin','agent'],
    fieldName: 'role'
  })
];

const restrictOwner = [
  hooks.restrictToOwner({
    idField: '_id', ownerField: 'postedBy'
  })
];


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: iffElse(hook => hook.params.user.role === 'user',
    [...restrictOwner],
    [...restrictAdminOrAgent]),
    get: [...restrictOwner],
    create: [],
    update: [...restrictOwner],
    patch: [...restrictOwner],
    remove: [...restrictOwner]
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
