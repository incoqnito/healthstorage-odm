import HealthStorageODM from '../healthStorage'

test('Create a schema', async () => {
  var Test = await HealthStorageODM.createSchema({
    title: 'SomeTestSchema',
    properties: {
      title: {
        type: HealthStorageODM.STRING
      },
      views: {
        type: HealthStorageODM.INTEGER
      },
      active: {
        type: HealthStorageODM.BOOLEAN
      }
    },
    options: {
      id: '82897c48-92f8-4a7f-8360-929e8b88765c',
      oId: '82897c48-92f8-4a7f-4550-929e8b89076c',
      r: 1
    }
  })

  expect(Test).toBeDefined()
})

test('Get a schema of current revision', async () => {
  let Test = await HealthStorageODM.getSchema({
    id: '82897c48-92f8-4a7f-8360-929e8b88765c'
  })

  expect(Test).toBeDefined()
})

test('Get a schema revision', async () => {
  let Test = await HealthStorageODM.getSchema({
    id: '82897c48-92f8-4a7f-8360-929e8b88765c',
    r: 1
  })

  expect(Test).toBeDefined()
})

test('Delete a schema ', async () => {
  let isDeleted = await HealthStorageODM.deleteSchema('82897c48-92f8-4a7f-8360-929e8b88765c')

  expect(isDeleted).toBe(true)
})
