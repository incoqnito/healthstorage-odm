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
    'title': 'Todo1 - Create Test',
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
    'title': 'Todo2 - Edit Test',
    'isCompleted': 0,
    'md': todo2.md
  }

  var todo2Edited = await HS_INSTANCE.updateById(editData)

  expect(todo2Edited.title).toBe('Todo2 - Edit Test')
})

test('Find all todos via instance', async () => {
  var todos = await HS_INSTANCE.findAll()
  expect(typeof todos.list).toBe('object')
})

test('Find todo by id via instance', async () => {
  var todo3 = await HS_INSTANCE.create({
    'title': 'Todo3 - Find this one by Id',
    'isCompleted': 0
  })

  var foundTodo = await HS_INSTANCE.findById(todo3.md.id)
  expect(foundTodo.md.id).toBe(todo3.md.id)
})

test('Check sdo changed sinced specified via instance', async () => {
  var todo4 = await HS_INSTANCE.create({
    'title': 'Todo4',
    'isCompleted': 0
  })
  var changedSinced = await HS_INSTANCE.changedSince(todo4.md.id, todo4.md.r)
  expect(changedSinced).toBeDefined()
})

test('Lock item via instance', async () => {
  var todo5 = await HS_INSTANCE.create({
    'title': 'Todo5 - Lock item',
    'isCompleted': 0
  })
  var lockValue = await HS_INSTANCE.lockById(todo5.md.id)

  expect(lockValue).toBeDefined()
})

test('Unlock item via instance', async () => {
  var todo6 = await HS_INSTANCE.create({
    'title': 'Todo6 - Unlock Item',
    'isCompleted': 0
  })
  var lockValue = await HS_INSTANCE.lockById(todo6.md.id)
  var unlockedTodo = await HS_INSTANCE.unlockById(todo6.md.id, lockValue.value)

  expect(unlockedTodo).toBeDefined()
})

test('Get lock data from item via instance', async () => {
  var todo6 = await HS_INSTANCE.create({
    'title': 'Todo6 - Get lock data',
    'isCompleted': 0
  })

  var lockValue = await HS_INSTANCE.lockById(todo6.md.id)

  var lockData = await HS_INSTANCE.getLockDataById(todo6.md.id, lockValue.value)

  expect(lockData).toBeDefined()
})
