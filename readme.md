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
## Documentation

### HsClient

The HsClient holds specific data for server connection, adapoter and debugging. You can create muliple HsClients in your project to connect to different servers. In future use the used adapter could be anything we implement to build a bridge between systems. For now only the HsStorage is ready to use.

### Create a HsClient

```ts

// By calling constructor with default
const CLIENT = new HealthStorageODM();

// By calling constructor with custom options
const CLIENT = new HealthStorageODM({
  serverUrl: 'https://your.server.url',
  adapter: 'adapter'
});

// By calling static createClient
const CLIENT = HealthStorageODM.createClient({
  serverUrl: 'https://your.server.url',
  adapter: 'adpater'
});

```

### Defining a instance of HsModel

Defining an instace of HsModel is realized by calling the define function from created Hsclient. It returns an instance of HsInstance which holds the api functionallity.

Example:
```ts
// Create a HsInstance with schema data
const veryNiceSchema = {
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
}

const veryNiceModel = CLIENT.define('veryNiceIdentifier', veryNiceSchema)
```

### HsModel

The HsModel holds all functionallity of the HS Api. You can use the static function for direct calls like find, findeById etc. or the build in model binded functions by createing a model like save, update, destroy etc. 

```ts
  // Simple example of HsModel
  HsModel = {
    HsAdapter: HsAdapter {client: {…}},
    HsSchema: HsSchema {schema: {…}}
    _id: (...), // reference from md.id
    __v: (...), // reference from md.r
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

### HsModel / HealthStorageODM Functions

#### Ereaser (during development)

##### deleteSchemaById(id)

Deletes during development a schema by its identifier.

```ts
  // Calling static function in HealthStorageODM
  HealthStorageODM.deleteSchemaById(id)
```

##### deleteById(id)

Deletes during development a sdo by its identifier.

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
Info: the HS API throws 500er on filter use

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling findAll
  await MODEL.findAll({
      orderBy: CLIENT.MD_DATE, // Ordering by provieded meta field tsp
      orderByDirection: CLIENT.ASC, // Sortorder ASC or DESC
      from: "", // ISO-Date string from date
      until: "", // ISO-Date string to date
      pageSize: 5 // Integer value for page sizing,
      pageNum: 1 // define page to show
    })
```

##### findById(id)

Finds an entry by its identifier.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling findById
  MODEL.findById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')
```

##### findOne(where)

```ts
  var published = COOMING_SOON;
```

##### create(data)

Creates new sdo in database.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)
  
  // Calling create
  MODEL.create({
    title: 'Title',
    isCompleted: false
  })

  // OOORRR

  const newModel = new MODEL({...attrs})
  newModel.save()
```

##### changedSince(id, r)

Checks if an item was changed since specified.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling static
  MODEL.changedSinceByIdAndRevision('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a', 1) // id, revision

  // Calling from model
  MODEL.changedSince()
```

##### updateById(id)

Updates an item by its identifier.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling update static
  MODEL.update({
    title: 'New title',
    isCompleted: true 
  }) // new data

  // Calling from model
  MODEL.update()
```

##### update(where, data)

```ts
  var published = COOMING_SOON;
```

##### archiveById(id)

```ts
  var published = COOMING_SOON;
```

##### archive(where)

```ts
  var published = COOMING_SOON;
```

##### lockById(id)

Create lock value for item.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Calling from HsInstance
  CLIENT.lockById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')

  // Calling from HsModel
  model.lock()
```

##### unlockById(id, lockValue)

Removes a lock value for item.

```ts
   c
  // Calling static
  MODEL.unlockById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a', '8ea6caed-5c0d-4dd2-b46b-709ed0f7818a')

  // Calling from model
  MOEDEL.unlock()
```

##### getLockById(id, lockValue)

Get lock from item by identifier.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Calling from HsInstance
  CLIENT.getLockById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a', '8ea6caed-5c0d-4dd2-b46b-709ed0f7818a')

  // Calling from HsModel
  model.getLock()
```

##### isLockedById(id, lockValue)

Check if item is locked by identifier.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)
  
  // Calling static
  MODEL.isLockedById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a', '8ea6caed-5c0d-4dd2-b46b-709ed0f7818a')

  // Calling from model
  MODEL.isLocked()
```

##### isLockState(id, lockState)

Check if item exists in lock state by identifier.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)
  
  // Calling static
  MODEL.isLockStateById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a', '8ea6caed-5c0d-4dd2-b46b-709ed0f7818a')

  // Calling from model
  MODEL.isLockState()
```

#### Sdo Blobs

##### createSdoBlob(opts)

This function is part of the ```ts HsInstance.create``` function. When a files field is present in the passed sdo object  ```ts HsInstance.create``` calls ```ts creatSdoBlob(opts)```. HsModel returned with extended blobRef information.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)
  
  // Calling static
  MODEL.create(opts) {
    if(data.files === undefined && data.files.length <= 0) {
      // create sdo
    } else {
      // create sdo blob
    }
  }

  // Calling from model
  const newModel = new HsModel({...attrs})
  newModel.save()
```

##### findBlobById(id)

Returns a complete sdoBlob object from the server. It is a multipart/form-data and contains the parts for sdo and files

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling static
  MODEL.findBlobById('5ea6caed-5c0c-4dd2-b46b-709ed0f2618a')

  // Calling from model
  MODEL.getFile()
```

##### getSdoBlobFile(opts)

This function is part of the ```ts HsModel.update``` function. When a blobRef field is present in the passed sdo object the ```ts HsModel.update``` calls ```ts editSdoBlob(opts)```. An updated HsModel returned.

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling static
  MODEL.update(opts) {
    if(data.files === undefined && data.files.length <= 0) {
      // create sdo
    } else {
      // create sdo blob
    }
  }

  // calling from model 
  MODEL.update()
```

#### Sdo Collections

##### bulkCreate(bulkList)

```ts
  var published = COOMING_SOON;
```

##### bulkUpdate(bulkList)

Updates a given sdo list (bulk operation)

```ts
  // Define client...
  const CLIENT = HealthStorageODM.createClient() // no options using local address

  // Define Model
  const MODEL = CLIENT.define("Identfier", SomeSchema)

  // Calling static
  MODEL.bulkUpdate(bulkList)
```

## HsDebugger (under construction)

The HsDebugger is buil at instance creation. It can be accessed by e.g. ```ts CLIENT.HsDebugger```. It brings up some debug functions.

### logConsole(key, value, stringified = false)

Logs a key value into the console.

```ts 
  // Log to console without stringified value
  CLIENT.HsDebugger.logConsole("Key", "Value")

  // Log to console with stringified value
  CLIENT.HsDebugger.logConsole("Key", "Value", true)
```

### logTable(mixed)

Logs a key value into the console as table format.

```ts 
  // Log to console as table
  CLIENT.HsDebugger.logTable{'test': 'value'})
```

## HS-CLI

```ts
  var published = COOMING_SOON;
```

## Installing Sample App

### Install npm-packages

Open console in healthstorage-odm package and move to ```./src/example/todo```. Type in ```npm install``` and install dependencies. 

### Run app

Important: First install all dependencies.

Open console healthstorage-odem package and move to ```./src/example/todo```. Type in ```npm start``` to run webpack.
After successfully created the files move to the link shown in console (eg. http://localhost:8080, http://localhost:8081, http://localhost:8082, ...)

Enjoy.

## Test cases

Under the folder ```./src/__tests__/``` are several tests stored. Run ```npm test``` in root directory of the project an see the tests running.
