const assert = require('assert');
const app = require('../../src/app');

describe('\'systemservices\' service', () => {
  it('registered the service', () => {
    const service = app.service('systemservices');

    assert.ok(service, 'Registered the service');
  });
});
