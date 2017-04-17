'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'ticketlog\' service', () => {
  it('registered the service', () => {
    const service = app.service('ticketlogs');

    assert.ok(service, 'Registered the service');
  });
});
