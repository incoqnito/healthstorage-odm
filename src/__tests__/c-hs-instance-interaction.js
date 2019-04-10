import HealthStorageODM from '../healthStorage'

const client = new HealthStorageODM({
  serverUrl: 'http://localhost:8080',
  adapter: 'healthStorageApi'
})

const Todo = client.define({
  title: 'TodoSchema',
  properties: {
    title: {
      type: HealthStorageODM.STRING
    },
    isCompleted: {
      type: HealthStorageODM.INTEGER
    }
  },
  options: {
    required: ['md'],
    id: '82897c48-92f8-4a7f-8360-929e8b12356c',
    oId: '82897c48-92f8-4a7f-4550-929e8b12356c',
    r: 1
  }
})

test('Create todo via instance', async () => {
  var todo1 = await Todo.create({
    title: 'Todo1 - Create Test',
    isCompleted: 0
  })

  expect(todo1.constructor.name).toBe('HsModel')
})

test('Edit todo by id via instance', async () => {
  var todo2 = await Todo.create({
    title: 'Todo2',
    isCompleted: 0
  })

  var editData = {
    title: 'Todo2 - Edit Test',
    isCompleted: 0,
    'md': todo2.md
  }

  var todo2Edited = await Todo.updateById(editData)

  expect(todo2Edited.title).toBe('Todo2 - Edit Test')
})

test('Find all todos via instance', async () => {
  var todos = await Todo.findAll()
  expect(typeof todos.list).toBe('object')
})

test('Find todo by id via instance', async () => {
  var todo3 = await Todo.create({
    title: 'Todo3 - Find this one by Id',
    isCompleted: 0
  })

  var foundTodo = await Todo.findById(todo3.md.id)
  expect(foundTodo.md.id).toBe(todo3.md.id)
})

test('Check sdo changed sinced specified via instance', async () => {
  var todo4 = await Todo.create({
    title: 'Todo4',
    isCompleted: 0
  })
  var changedSince = await Todo.changedSince(todo4.md.id, todo4.md.r)
  expect(changedSince).toBeDefined()
})

test('Lock item via instance', async () => {
  var todo5 = await Todo.create({
    title: 'Todo5 - Lock item',
    isCompleted: 0
  })
  var lockValue = await Todo.lockById(todo5.md.id)

  expect(lockValue).toBeDefined()
})

test('Unlock item via instance', async () => {
  var todo6 = await Todo.create({
    title: 'Todo6 - Unlock Item',
    isCompleted: 0
  })
  var lockValue = await Todo.lockById(todo6.md.id)
  var unlockedTodo = await Todo.unlockById(todo6.md.id, lockValue.value)

  expect(unlockedTodo).toBeDefined()
})

test('Get lock data from item via instance', async () => {
  var todo7 = await Todo.create({
    title: 'Todo7 - Get lock data',
    isCompleted: 0
  })

  var lockValue = await Todo.lockById(todo7.md.id)

  var lockData = await Todo.getLockDataById(todo7.md.id, lockValue.value)

  expect(lockData).toBeDefined()
})

test('Check is locked item via instance', async () => {
  var todo8 = await Todo.create({
    title: 'Todo7 - Is locked true',
    isCompleted: 0
  })

  var lockValueTodo8 = await Todo.lockById(todo8.md.id)
  var isLockedTodo8 = await Todo.isLockedById(todo8.md.id, lockValueTodo8.value)

  expect(isLockedTodo8).toBe(true)
})

test('Check item not exists in lock state via instance', async () => {
  var todo9 = await Todo.create({
    title: 'Todo9 - Exists in lock state',
    isCompleted: 0
  })
  var existsNotInLockState = await Todo.isLockedById(todo9.md.id, '')

  expect(existsNotInLockState).toBe(false)
})

test('Get full sdo revisions via instance', async () => {
  var todo10 = await Todo.create({
    title: 'Todo10 - Test edit',
    isCompleted: 0
  })

  var editData = {
    title: 'Todo10 - Test edited',
    isCompleted: 0,
    'md': todo10.md
  }

  await Todo.updateById(editData)
  var sdoRevisons = await Todo.getArchiveBySdoId(todo10.md.id)

  expect(sdoRevisons).toBeDefined()
})

test('Get sdo revision numbers via instance', async () => {
  var todo11 = await Todo.create({
    title: 'Todo10 - Test edit',
    isCompleted: 0
  })

  var editData = {
    title: 'Todo11 - Test edited',
    isCompleted: 0,
    'md': todo11.md
  }

  await Todo.updateById(editData)
  var sdoRevisonNumbers = await Todo.getRevisionsArchiveBySdoId(todo11.md.id)

  expect(sdoRevisonNumbers.length).toBe(1)
})

test('Delete sdo by id via instance', async () => {
  var todos = await Todo.findAll()

  for (let todo in todos.list) {
    let deletedId = await Todo.deleteById(todos.list[todo].md.id)
    expect(deletedId).toBe(todos.list[todo].md.id)
  }
})
