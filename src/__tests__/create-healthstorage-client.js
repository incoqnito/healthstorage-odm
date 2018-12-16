import HealthStorage from 'healthstorage-odm'

xtest('create client via constructor', () => {
  const client = new HealthStorage({
    serverUrl: 'http://localhost:8080'
  })

  expect(client).toBeDefined()
})

xtest('create client via constructor', () => {
  const client = HealthStorage.create({
    serverUrl: 'http://localhost:8080'
  })

  expect(client).toBeDefined()
})
