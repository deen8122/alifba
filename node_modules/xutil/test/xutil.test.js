'use strict';

var _ = require('..');

describe('test', function() {
  it('base', function() {
    _.ipv4.should.be.ok();
    _.uuid().should.be.ok();
  });
});
