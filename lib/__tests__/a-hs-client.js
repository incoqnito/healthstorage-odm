"use strict";

var HealthStorageODM = require('../healthStorage'); // import currently not working with jest config, need to be implemented later


test('Create client via constructor', function () {
  var HS = new HealthStorageODM({
    serverUrl: 'http://localhost:8080',
    adapter: 'healthStorageApi'
  });
  expect(HS.constructor.name).toBe('HsClient');
});
test('Create client via function', function () {
  var HS = HealthStorageODM.createClient({
    serverUrl: 'http://localhost:8080',
    adapter: 'healthStorageApi'
  });
  expect(HS.constructor.name).toBe('HsClient');
});