const assert = require('assert');
const app = require('../../src/app');

describe('\'Wizard\' service', () => {
  it('registered the service', () => {
    const service = app.service('wizard');

    assert.ok(service, 'Registered the service');
  });
});
