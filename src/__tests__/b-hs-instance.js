import HealthStorageODM from '../healthStorage'

const client = new HealthStorageODM({
  serverUrl: 'http://localhost:8080',
  adapter: 'healthStorageApi'
})

test('Defining a HealthStorage instance', () => {
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
  expect(Todo.constructor.name).toBe('HsInstance')
})
