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

xtest('update todo ', async () => {
  const todo = await Todo.create({
    title: 'updated',
    isCompleted: false
  })

  await todo.update({
    title: 'test'
  })

  expect(todo.title).toBe('test')
})

xtest('destroy todo ', async () => {
  const todo = await Todo.create({
    title: 'updated',
    isCompleted: false
  })

  await todo.destroy()

  expect(todo).toBeUndefined()
})

xtest('archive todo ', async () => {
  const todo = await Todo.create({
    title: 'updated',
    isCompleted: false
  })

  await todo.archive()

  expect(todo).toBeUndefined()
})

xtest('manually save todo ', async () => {
  const todo = await Todo.create({
    title: 'updated',
    isCompleted: false
  })

  todo.title = 'test'

  await todo.save()

  expect(todo.title).toBe('test')
})
