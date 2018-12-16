import HealthStorage from 'healthstorage-odm'

const client = HealthStorage.create({
  serverUrl: 'http://localhost:8080'
})

/*
  not intended for using in production code creating schema is only used for development and should only be used for commit and rollback migrations
*/

// create a model by schemaId and current revision
xtest('define a model ', () => {
  client.defineModel('5ea6caed-5c0c-47d2-b46b-709ed0f2618a', {
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
})

// create a model by schemaId and given revision
xtest('define a model ', () => {
  client.defineModel('5ea6caed-5c0c-47d2-b46b-709ed0f2618a', 1.2, {
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
})
