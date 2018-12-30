const HSODM = require('../healthStorage') // import currently not working with jest config, need to be implemented later
const CLIENT = new HSODM({
  serverUrl: 'http://localhost:8080',
  adapter: 'healthStorageApi'
})
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

test('Create todo via instance', async () => {
  var todo1 = await HS_INSTANCE.create({
    'title': 'Todo1',
    'isCompleted': 0
  })
  expect(todo1.constructor.name).toBe('HsModel')
})

test('Edit todo by id via instance', async () => {
  var todo2 = await HS_INSTANCE.create({
    'title': 'Todo2',
    'isCompleted': 0
  })

  var editData = {
    'title': 'Todo2 Edited',
    'isCompleted': 0,
    'md': todo2.md
  }

  var todo2Edited = await HS_INSTANCE.updateById(editData)

  expect(todo2Edited.title).toBe('Todo2 Edited')
})

test('Find all todos via instance', async () => {
  var todos = await HS_INSTANCE.findAll()
  console.log(todos)
})
