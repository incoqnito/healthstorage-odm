# HealthStorageODM

The healthstorage-odm serves the HS storage api. It provides a simple structure to use the interface efficiently and purposefully.

## Installing

First install [node.js](https://nodejs.org/en/).

```ts
npm install healthstorage-odm
```

## Importing

```ts
// Using ES6 imports
import HealthStorageODM from 'healthstorage-odm';
```
## Overview

### Defining a HsClient

It is possible to create multiple HsClient instances for diffrent servers. Creating a new Hsclient works like this:

```ts
// By calling constructor
const CLIENT = new HealthStorageODM({
  serverUrl: 'https://your.server.url'
});

// By calling static createClient
const CLIENT = HealthStorageODM.createClient({
  serverUrl: 'https://your.server.url'
});
```

If there are no parameters set, it will take http://localhost:8080 as a default client server url.

The created client returns an instance for further use.

### Defining a HsInstance

Defining a HsInstance is realized by calling the define function from created Hsclient. It returns an instance of HsInstance which holds the api functionallity.

Example:
```ts
// Create a HsInstance with schema data
const sampleSchema = CLIENT.define({
  title: 'SomeSchema',
  properties: {
    title: {
      type: HealthStorageODM.STRING
    },
    description: {
      type: HealthStorageODM.STRING
    },
    price: {
      type: HealthStorageODM.DOUBLE
    },
    online: {
      type: HealthStorageODM.BOOLEAN
    },
    hits: {
      type: HealthStorageODM.INTEGER
    }
  },
  options: {
    required: [md],
    oId: '1a8a1956-fde7-486f-91b8-ce9a3d9b4be1', // uuid
    id: '5cc6ae3e-bf8f-4be5-b6fb-5de55ca9fd8a' // uuid
  }
})
```

### HsModel

A HsModel is always used for a single item returned in list, create, update etc. It holds the single item information and function to update, lock, delete itself. The properties are dynamically assigned as getter/setter and stored additionally in the _dataValues property of the model.

```ts
  // Simple example of HsModel
  HsModel = {
    HsRequest: HsRequest {client: {…}},
    _dataValues: {
      id: "", //uuid
      title: "SampleTitle", 
      isCompleted: false, 
      md: {…}
    },
    id: (...),
    isCompleted: (...),
    lockValue: (...),
    md: (...),
    title: (...),
    get id: ƒ (),
    set id: ƒ (value),
    get isCompleted: ƒ ()
    set isCompleted: ƒ (value),
    get md: ƒ (),
    set md: ƒ (value),
    get title: ƒ (),
    set title: ƒ (value)
  }
```

### HsInstace / HealthStorageODM Functions

#### Ereaser (during development)

##### deleteSchemaById(id)

Deletes during development a schema by its identifier.

```ts
  // Calling static function in HealthStorageODM
  HealthStorageODM.deleteSchemaById(id)
```

##### deleteById(id)

Deletes during development a schema by its identifier.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Calling from HsInstance
  CLIENT.deleteById(id)

  // Otherwise calling from HsModel
  model.destroy()
```

#### Schemas (during development)

##### createSchema()

```ts
// Calling static function create schema
HealthStorageODM.createSchema({
  title: 'SampleSchema',
  properties: {
    id: {
      type: HealthStorageODM.STRING
    },
    title: {
      type: HealthStorageODM.STRING
    },
    color: {
      type: HealthStorageODM.STRING
    }
  },
  options: {
    required: ['md']
  }
```

#### Sdo

##### findAll(options)

Finds all entries matched for given options and filters.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Calling findAll
  await CLIENT.findAll({
      orderBy: CLIENT.MD_DATE, // Ordering by provieded meta field tsp
      orderByDirection: CLIENT.ASC, // Sortorder ASC or DESC
      from: "", // ISO-Date string from date
      until: "", // ISO-Date string to date
      pageSize: 5 // Integer value for page sizing
    })
```

##### findById(id)



##### findOne(where)

##### create(data)

##### changedSince(id, r)

##### updateById(id)

##### update(where, data)

##### archiveById(id)

##### archive(where)

##### lock(id)

##### unlock(id, lockValue)

##### getLock(id, lockValue)

##### isLocked(id, lockValue)

##### isLockState(id, lockState)

#### Sdo Blobs

##### Coming soon

#### Sdo Collections

##### bulkCreate(bulkList)

##### bulkUpdate(bulkList)


#### findAll

This function will search after all sdos matching for defined schema.

Example:
```ts
const sampleSdos = SampleSchema.findAll({
    pageNum: 1,
    pageSize: 15,
    orderBy: 'id',
    orderByDirection: SampleSchema.ASC,
  }
)
```

## Installing Sample App

### Install npm-packages

Open console in healthstorage-odm package and move to ````./src/example/```. Type in ```npm install``` and install dependencies. 

### Run app

Important: First install all dependencies.

Open console healthstorage-odem package and move to ```./src/example/```. Type in ```npm start``` to run webpack.
After successfully created the files move to the link shown in console (eg. http://localhost:8080, http://localhost:8081, http://localhost:8082, ...)

Enjoy.
