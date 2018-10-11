const assert = require('assert');
const app = require('../../src/app');

describe('\'systemstat\' service', () => {
  it('registered the service', () => {
    const service = app.service('systemstat');

    assert.ok(service, 'Registered the service');
  });
});
