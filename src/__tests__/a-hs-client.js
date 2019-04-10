import HealthStorageODM from '../healthStorage'

test('Create client via constructor', () => {
  const HS = new HealthStorageODM({
    serverUrl: 'http://localhost:8080',
    adapter: 'healthStorageApi'
  })
  expect(HS.constructor.name).toBe('HsClient')
})

test('Create client via function', () => {
  const HS = HealthStorageODM.createClient({
    serverUrl: 'http://localhost:8080',
    adapter: 'healthStorageApi'
  })
  expect(HS.constructor.name).toBe('HsClient')
})
