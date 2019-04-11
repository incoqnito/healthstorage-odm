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

test('Edit sdo via model', async () => {
  var todo1 = await Todo.create({
    title: 'Todo1 - Created',
    isCompleted: 0
  })

  todo1.title = 'Todo1 - Edited by model'

  var todo1Edited = await todo1.update()

  expect(todo1Edited.title).toBe('Todo1 - Edited by model')
})

test('Check sdo changed sinced sepcified via model', async () => {
  var todo2 = await Todo.create({
    title: 'Todo2 - Sdo changed',
    isCompleted: 0
  })

  var changedSince = await todo2.changedSince()

  expect(changedSince).toBe(false)
})

test('Lock item via model', async () => {
  var todo3 = await Todo.create({
    title: 'Todo3 - Lock sdo',
    isCompleted: 0
  })

  await todo3.lock()

  expect(todo3.lockValue).toBeDefined()
})

test('Unlock item via model', async () => {
  var todo4 = await Todo.create({
    title: 'Todo4 - Unlock sdo',
    isCompleted: 0
  })

  await todo4.lock()
  await todo4.unlock()

  expect(todo4.lockValue).toBe(null)
})

test('Check is locked item via model', async () => {
  var todo6 = await Todo.create({
    title: 'Todo6 - Is locked',
    isCompleted: 0
  })

  let isLocked = await todo6.isLocked()

  expect(isLocked).toBe(false)
})

test('Exists not in lock state via model', async () => {
  var todo7 = await Todo.create({
    title: 'Todo6 - Exists in lock state',
    isCompleted: 0
  })

  let lockState = await todo7.existInLockState()

  expect(lockState).toBe(false)
})

test('Get archive via model', async () => {
  var todo8 = await Todo.create({
    title: 'Todo8 - Get Archive',
    isCompleted: 0
  })

  todo8.title = 'Todo8 - Edited for revision'

  await todo8.update()
  let archive = todo8.getArchive()

  expect(archive).toBeDefined()
})

test('Get archive revision numbers via model', async () => {
  var todo9 = await Todo.create({
    title: 'Todo9 - Get Archive',
    isCompleted: 0
  })

  todo9.title = 'Todo9 - Edited for revision'

  let editedTodo9 = await todo9.update()
  let archiveRevNumbers = await editedTodo9.getArchiveRevisionNumbers()

  expect(archiveRevNumbers.length).toBe(1)
})

test('Delete sdo by id via model', async () => {
  var todos = await Todo.findAll()

  for (let todo in todos.list) {
    let deletedId = await todos.list[todo].destroy()
    expect(deletedId).toBe(todos.list[todo].md.id)
  }
})
