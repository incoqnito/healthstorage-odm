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

test('Edit sdo via model', async () => {
  var todo1 = await HS_INSTANCE.create({
    'title': 'Todo1 - Created',
    'isCompleted': 0
  })

  todo1.title = 'Todo1 - Edited by model'

  var todo1Edited = await todo1.update()

  expect(todo1Edited.title).toBe('Todo1 - Edited by model')
})

test('Check sdo changed sinced sepcified via model', async () => {
  var todo2 = await HS_INSTANCE.create({
    'title': 'Todo2 - Sdo changed',
    'isCompleted': 0
  })

  var changedSince = await todo2.changedSince()

  expect(changedSince).toBe(false)
})

test('Lock item via model', async () => {
  var todo3 = await HS_INSTANCE.create({
    'title': 'Todo3 - Lock sdo',
    'isCompleted': 0
  })

  await todo3.lock()

  expect(todo3.lockValue).toBeDefined()
})

test('Unlock item via model', async () => {
  var todo4 = await HS_INSTANCE.create({
    'title': 'Todo4 - Unlock sdo',
    'isCompleted': 0
  })

  await todo4.lock()
  await todo4.unlock()

  expect(todo4.lockValue).toBe(null)
})

test('Check is locked item via model', async () => {
  var todo6 = await HS_INSTANCE.create({
    'title': 'Todo6 - Is locked',
    'isCompleted': 0
  })

  let isLocked = await todo6.isLocked()

  expect(isLocked).toBe(false)
})

test('Delete sdo by id via model', async () => {
  var todos = await HS_INSTANCE.findAll()

  for (let todo in todos.list) {
    let deletedId = await todos.list[todo].destroy()
    expect(deletedId).toBe(todos.list[todo].md.id)
  }
})
