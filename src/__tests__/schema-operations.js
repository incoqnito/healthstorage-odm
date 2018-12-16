import HealthStorage from 'healthstorage-odm'

const client = HealthStorage.create({
  serverUrl: 'http://localhost:8080'
})

/*
  not intended for using in production code creating schema is only used for development and should only be used for commit and rollback migrations
*/

// create a schema
xtest('create a schema ', () => {
  client.createSchema({
    title: 'TodoSchema',
    properties: {
      title: {
        type: HealthStorage.STRING
      },
      isCompleted: {
        type: HealthStorage.STRING
      }
    },
    options: {
      'id': '5ea6caed-5c0c-47d2-b46b-709ed0f2618a',
      'r': 1,
      'eId': '05b4c684-9bfe-496c-b4ea-1a1933d30f14',
      'sId': '35d64bca-017e-11e9-8eb2-f2801f1b9fd1',
      'sr': 1,
      'oId': '35d64e40-017e-11e9-8eb2-f2801f1b9fd1',
      'tsp': '35d6500c-017e-11e9-8eb2-f2801f1b9fd1'
    }
  })
    .then((schema) => console.log(schema))
    .catch((error) => console.log(error))
})

xtest('delete a schema ', () => {
  // delete schema by id
  client.deleteSchema('5ea6caed-5c0c-47d2-b46b-709ed0f2618a')
    .then((schema) => console.log(schema))
    .catch((error) => console.log(error))
})

xtest('get a schema of current revision', () => {
  // get schema by current revision
  client.getSchema('5ea6caed-5c0c-47d2-b46b-709ed0f2618a')
    .then((schema) => console.log(schema))
    .catch((error) => console.log(error))
})

xtest('get a schema revision', () => {
  // get schema by schemaId and revision
  client.getSchemaRevision('5ea6caed-5c0c-47d2-b46b-709ed0f2618a', 1.4)
    .then((schema) => console.log(schema))
    .catch((error) => console.log(error))
})
