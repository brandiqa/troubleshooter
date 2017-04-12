'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'category\' service', () => {
  it('registered the service', () => {
    const service = app.service('categories');

    assert.ok(service, 'Registered the service');
  });
});
