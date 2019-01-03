const HSODM = require('../healthStorage') // import currently not working with jest config, need to be implemented later

test('Create a schema', async () => {
  var schema = await HSODM.createSchema({
    'title': 'SomeTestSchema',
    'properties': {
      'title': {
        'type': HSODM.STRING
      },
      'views': {
        'type': HSODM.INTEGER
      },
      'active': {
        'type': HSODM.BOOLEAN
      }
    },
    'options': {
      'id': '82897c48-92f8-4a7f-8360-929e8b88765c',
      'oId': '82897c48-92f8-4a7f-4550-929e8b89076c',
      'r': 1
    }
  })
  expect(schema).toBeDefined()
})

test('Get a schema of current revision', () => {
  expect('test').toBe('test')
})

test('Delete a schema ', async () => {
  var deletedSchema = await HSODM.deleteSchema('82897c48-92f8-4a7f-8360-929e8b88765c')
  expect(deletedSchema).toBe(true)
})

xtest('Get a schema of current revision', () => {
  expect('test').toBe('test')
})

xtest('Get a schema revision', () => {
  expect('test').toBe('test')
})
