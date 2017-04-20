'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const  { restrictToRoles } = require('feathers-authentication-hooks');
const hooks = require('feathers-authentication-hooks');
const { iffElse } = require('feathers-hooks-common');
const { populate } = require('feathers-hooks-common');

const isUser = () => hook => hook.params.user.role === 'user';

const restrictAgent = [
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

const restrictOwnerAgent = iffElse(isUser(),
  [...restrictOwner],
  [...restrictAgent]
);

const postedBySchema = {
  include: {
    service: 'user',
    nameAs: 'user',
    parentField: 'postedBy',
    childField:'_id'
  }
};

const populateUser = [
  populate({ schema:postedBySchema })
];

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [restrictOwnerAgent],
    get: [...restrictOwner],
    create: [],
    update: [...restrictOwner],
    patch: [...restrictOwner],
    remove: [...restrictOwner]
  },

  after: {
    all: [],
    find: [...populateUser],
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
