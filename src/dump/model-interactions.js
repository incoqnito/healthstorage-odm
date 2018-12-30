import HealthStorage from 'healthstorage-odm'

const client = HealthStorage.create({
  serverUrl: 'http://localhost:8080'
})

const Todo = client.defineModel('5ea6caed-5c0c-47d2-b46b-709ed0f2618a', {
  properties: {
    title: {
      type: HealthStorage.STRING
    },
    isCompleted: {
      type: HealthStorage.STRING
    }
  }
})
  .then((modelInstance) => console.log(modelInstance))
  .catch((error) => console.log(error))

/*
  not intended for using in production code creating schema is only used for development and should only be used for commit and rollback migrations
*/

// find all sdos
xtest('find all ', async () => {
  const todo = await Todo.all()

  expect(todo).toBeDefined()
})

// find a sdo by id
xtest('find by id ', async () => {
  const todo = await Todo.findById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')

  expect(todo).toBeDefined()
})

// find a sdo by params
xtest('find ', async () => {
  const todo = await Todo.find({
    id: '5ea6caed-5c0c-4dd2-b46b-709ed0f2618a'
  })

  expect(todo).toBeDefined()
})

// update a sdo by params
xtest('create ', async () => {
  const todo = await Todo.create({
    title: 'updated',
    isCompleted: false
  })

  expect(todo).toBeDefined()
})

// update a sdo by id
xtest('update by id ', async () => {
  const todo = await Todo.updateById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a', {

  })

  expect(todo).toBeDefined()
})

// update a sdo by params
xtest('update ', async () => {
  const todo = await Todo.update({
    id: '5ea6caed-5c0c-4dd2-b46b-709ed0f2618a'
  }, {
    title: 'updated'
  })

  expect(todo).toBeDefined()
})

// delete a sdo by id
xtest('delete by id ', async () => {
  const todo = await Todo.deleteById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')

  expect(todo).toBeDefined()
})

// delete a sdo by params
xtest('delete ', async () => {
  const todo = await Todo.delete({
    id: '5ea6caed-5c0c-4dd2-b46b-709ed0f2618a'
  })

  expect(todo).toBeDefined()
})

// lock a sdo by id
xtest('lock by id ', async () => {
  const todo = await Todo.lockById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')

  expect(todo).toBeDefined()
})

// lock a sdo by id
xtest('unlock by id ', async () => {
  const todo = await Todo.unlockById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')

  expect(todo).toBeDefined()
})
