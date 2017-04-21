'use strict';

const { authenticate } = require('feathers-authentication').hooks;

// populate ticket.assignedTo (supply agent user)
const assignAgent = () => {
  return hook => {
    const assignedTo = hook.params.user;
    hook.data.assignedTo = assignedTo;
    return Promise.resolve(hook);
  };
};

// populate issue.ticketId
const updateIssue = () => {
  return hook => {
    const ticket = hook.result;
    const issueId = ticket.issues[0];
    return hook.app.service('issues')
      .patch(issueId, {ticketId:ticket,status:'assigned'})
      .then(result => {
        hook.app.service('issues').emit('ticketAssigned',{ ticketAssigned:result });
      });
  };
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [assignAgent()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateIssue()],
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
