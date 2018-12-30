const HSODM = require('../healthStorage') // import currently not working with jest config, need to be implemented later
const CLIENT = new HSODM({
  serverUrl: 'http://localhost.de:8080',
  adapter: 'healthStorageApi'
})

test('Defining a HealthStorage instance', () => {
  const HS_INSTANCE = CLIENT.define({
    'title': 'TodoSchema',
    'properties': {
      'title': {
        'type': HSODM.STRING
      },
      'isCompleted': {
        'type': HSODM.INTEGER
      }
    },
    'options': {
      required: ['md'],
      id: '82897c48-92f8-4a7f-8360-929e8b12356c',
      oId: '82897c48-92f8-4a7f-4550-929e8b12356c',
      r: 1
    }
  })
  expect(HS_INSTANCE.constructor.name).toBe('HsInstance')
})
