const HSODM = require('./../healthStorage') // import currently not working with jest config, need to be implemented later

test('Create client via constructor', () => {
  const HS = new HSODM({
    serverUrl: 'http://localhost.de:8080',
    adapter: 'healthStorageApi'
  })
  expect(HS.constructor.name).toBe('HsClient')
})

test('Create client via function', () => {
  const HS = HSODM.createClient({
    serverUrl: 'http://localhost.de:8080',
    adapter: 'healthStorageApi'
  })
  expect(HS.constructor.name).toBe('HsClient')
})
