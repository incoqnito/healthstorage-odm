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

### HealthStorageODM

This is the entry point of the odm. 

#### HealthStorageODM usable constants

Usable constants for schema creation in field types.

```ts

  HealthStorag.STRING // string type
  HealthStorag.NUMBER // number type
  HealthStorag.INTEGER // integer type
  HealthStorag.BOOLEAN // boolean type
  HealthStorag.OBJECT // object type
  HealthStorag.ARRAY // array type
  HealthStorag.DATE // date type

```

#### HealthStorageODM functions

##### createSchema

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
  })

```

##### deleteSchemaById

```ts 

  // Calling static function in HealthStorageODM
  HealthStorageODM.deleteSchemaById(id)

```

##### createClient

```ts

  // By calling constructor with default options
  const CLIENT = new HealthStorageODM();

  // By calling static createClient
  const CLIENT = HealthStorageODM.createClient({
    serverUrl: 'https://your.server.url',
    adapter: 'adpater'
  });

```

### HsClient

The HsClient holds specific data for server connection, adapter and debugging. You can create muliple HsClients in your project to connect to different servers. In future use the used adapter could be anything we implement to build a bridge between systems. For now only the HsStorage is ready to use.

##### Create a HsClient

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

### HsModel

The HsModel provides functionallity to interact with the selected adapter. It is like a services between this two layers. The Model needs a schema and identifier to deal with. There are static function which you can call directly after initialize the model and model binded function which interacts with the model itself.

All models reference from md.id to _id and md.r to __v (id of model and version of model)

##### Creating a HsModel

```ts

  // Create a const which is holding the schema data
  const SomeSchema = {
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

  // create the new model
  const SomeModel = CLIENT.define('SomeModel', SomeSchema)

```

#### HsModel constants

```ts

  HsModel.ASC // ascending sort dir
  HsModel.DESC // descending sort dir
  HsModel.MD_ID // meta id sort field
  HsModel.MD_REVISION // meta revision sort field
  HsModel.MD_DATE // meta date sort field
  HsModel.EQUAL // filter request equal
  HsModel.NOT_EQUAL // filter request unequal
  HsModel.CONTAINS // filter request contains
  HsModel.NOT_CONTAIN // filter request not contains
  HsModel.START_WITH // filter request string start with
  HsModel.END_WITH // filter request string end with
  HsModel.LOWER_THAN // filter request lower than
  HsModel.LOWER_EQUAL_THAN // filter request lower equal than
  HsModel.GREATER_THAN // filter request greater than
  HsModel.GREATER_EQUAL_THAN // filter request greater equal than
  HsModel.AND // filter request logical and for filter fields
  HsModel.OR // filter request logical or for filter fields

```

#### HsModel functions

##### static find

```ts

   /**
   * Find one entry
   * @param {Object} where key value pairs for filter
   * @param {Object} opts logic, take, skip, sort
   * @returns {Promise}
   * 
   * Can also called without the filter param. In this case all entries for your request retruned
   **/
  SomeModel.find({
    filter: {
      take: 10,
      skip: 0,
      sort:[{
        field: 'md.id',
        dir: 'asc'
      }],
      filters: [{
        'field': 'name',
        'operator': HsModel.EQUAL,
        'value': 'Username',
      }]
    }
  })

```

##### static findOne

```ts

  /**
   * Find one entry
   * @param {Object} where key value pairs for filter
   * @param {Object} opts logic, take, skip, sort
   * @returns {Promise}
   **/
  SomeModel.findOne(
    {
      username: 'username',
      email: 'email'
    },
    {
      logic: HsModel.AND
    }
  )

```


##### static findOneAndUpdate

```ts

  /**
   * Find one entry and update it with new data
   * @param {Object} where key value pairs for filter
   * @param {Object} data new data for update
   * @param {Object} opts logic, take, skip, sort
   * @returns {Promise}
   **/
  SomeModel.findOneAndUpdate(
    {
      username: 'username'
    },
    {
      firstName: 'Karsten',
      lastName: 'Grizzle'
    }
    {
      logic: HsModel.AND
    }
  )

```

##### static findById

```ts

  /**
   * Find entry by its identifier
   * @param {String} sdoId
   * @returns {Promise}
   **/
  SomeModel.findById('013f6860-56c1-4299-b418-07ba4f13d16a')

```

##### static findBlobById

```ts

  /**
   * Find blob for entry by its identifier
   * @param {String} id
   * @returns {Promise}
   **/
  SomeModel.findBlobById('013f6860-56c1-4299-b418-07ba4f13d16a')

```

##### static findBlobFileById

```ts

  /**
   * Find blob file entry by its identifier
   * @param {String} sdoId
   * @param {String} blobId
   * @returns {Promise}
   **/
  SomeModel.findBlobFileById('013f6860-56c1-4299-b418-07ba4f13d16a', '013f6860-56c1-4299-b418-07ba4f13d16b')

```

##### static create

```ts 
  /**
   * Create a new entry
   * @param {Object} data
   * @returns {Promise}
   */
  SomeModel.create({
    username: 'username',
    email: 'email',
    password: 'password'
  })

```

##### static changedSinceByIdAndRevision

```ts 

  /**
   * Check if sdo changed since specified item
   * @param {String} sdoId
   * @param {Integer} r
   * @returns {Promise}
   */
  SomeModel.changedSinceByIdAndRevision('013f6860-56c1-4299-b418-07ba4f13d16a', 1)

```

##### static updateById

```ts 

  /**
   * Update sdo by identifiern and given data
   * @param {String} sdoId
   * @param {Object|HsModel} data
   * @returns {Promise}
   */
  SomeModel.updateById('013f6860-56c1-4299-b418-07ba4f13d16a', {
    username: 'username',
    email: 'email'
  })

```

##### static updateWhere

```ts 

  /**
   * Coming soon
   */
  SomeModel.toBeDefined()

```

##### static bulkCreate

```ts 

  /**
   * Coming soon
   */
  SomeModel.toBeDefined()

```

##### static bulkUpdate

```ts

  /**
   * Update bulk list
   * @param {Array} bulkList holds HsModels to update
   * @returns {Promise}
   */
  SomeModel.updateById(bulkList)
)

```

##### static archiveById

```ts

  /**
   * Coming soon
   */
  SomeModel.toBeDefined()

```

##### static archiveWhere

```ts

  /**
   * Coming soon
   */
  SomeModel.toBeDefined()

```

##### static lockById

```ts

  /**
   * Lock entry by its identifier
   * @param {String} id
   * @returns {Promise}
   */
  SomeModel.lockById('013f6860-56c1-4299-b418-07ba4f13d16a')

```

##### static unlockById

```ts

  /**
   * Unlock entry by its identifier and lockValueId
   * @param {String} id
   * @param {String} lockValueId
   * @returns {Promise}
   */
  SomeModel.unlockById('013f6860-56c1-4299-b418-07ba4f13d16a', '013f6860-56c1-4299-b418-07ba4f13d90k')


```

##### static getLockDataById

```ts

  /**
   * Get lock value on sdo by its identifier and lock value
   * @param {String} id
   * @param {String} lockValueId
   * @returns {Promise}
   */
  SomeModel.getLockDataById('013f6860-56c1-4299-b418-07ba4f13d16a', '013f6860-56c1-4299-b418-07ba4f13d90k')

```

##### static isLockedById

```ts

  /**
   * Check if sdo is locked
   * @param {String} id
   * @param {String} lockValueId
   * @returns {Promise}
   */
  SomeModel.isLockedById('013f6860-56c1-4299-b418-07ba4f13d16a', '013f6860-56c1-4299-b418-07ba4f13d90k')

```

##### static existsInLockStateById

```ts

  /**
   * Check if sdo exists with lock State
   * @param {String} id
   * @param {Boolean} lockState
   * @returns {Promise}
   */
  SomeModel.existsInLockStateById('013f6860-56c1-4299-b418-07ba4f13d16a', true)

```

##### static deleteById

```ts

  /**
   * Delete entry by its identifier
   * @param {String} id
   * @returns {Promise}
   */
  SomeModel.deleteById('013f6860-56c1-4299-b418-07ba4f13d16a')

```

##### static deleteWhere

```ts

  /**
   * Coming soon
   */
  SomeModel.toBeDefined()

```

##### static getArchiveBySdoId

```ts

  /**
   * Get archive from entry (full arichve entries as array of object)
   * @param {String} id
   * @param {Integer} pageNo
   * @param {Integer} pagesize
   * @returns {Promise}
   */
  SomeModel.getArchiveBySdoId('013f6860-56c1-4299-b418-07ba4f13d16a', 1, 15)

```

##### static getRevisionsArchiveBySdoId

```ts

  /**
   * Get archive from entry (revison numbers as array)
   * @param {String} id
   * @returns {Promise}
   */
  SomeModel.getRevisionsArchiveBySdoId('013f6860-56c1-4299-b418-07ba4f13d16a')

```

##### static createBlob

```ts

  /**
   * Create a new sod blob
   * @param {Object} data needs to be form data
   * @returns {Promise}
   */
  SomeModel.createBlob(sdoBlobFormdata)

```

##### save

```ts

  /**
   * Save created model with its properties
   * @return {Promise}
   */
  SomeModel.save()

```


##### update

```ts

  /**
   * Update changed properties in model
   * @return {Promise}
   */
  SomeModel.update()

```

##### destroy

```ts

  /**
   * Destroy model itself
   * @return {Promise}
   */
  SomeModel.destroy()

```

##### geFile

```ts

  /**
   * Get attached File from model
   * @return {Promise}
   */
  SomeModel.destroy()

```

##### archive

```ts

  /**
   * Archive model
   * @return {Promise}
   */
  SomeModel.archive()

```

##### getArchivedRevisions


```ts

  /**
   * Get archived revison numbers for model
   * @return {Promise}
   */
  SomeModel.getArchivedRevisions()

```

##### getArchive

```ts

  /**
   * Get archived sdos mof model
   * @param {Integer} pageNo
   * @param {Integer} pageSize
   * @return {Promise}
   */
  SomeModel.getArchive(pageNo = 1, pageSize = 10)

```

##### changedSince

```ts

  /**
   * Check model last change since
   * @return {Promise}
   */
  SomeModel.changedSince()

```

##### lock

```ts

  /**
   * Lock model
   * @return {Promise}
   */
  SomeModel.lock()

```

##### unlock

```ts

  /**
   * Unlock model
   * @return {Promise}
   */
  SomeModel.unlock()

```

##### getLockData 

```ts

  /**
   * Get lock data for model
   * @return {Promise}
   */
  SomeModel.getLockData()

```

##### isLocked

```ts

  /**
   * Check if model is locked
   * @return {Promise}
   */
  SomeModel.isLocked()

```

##### isInLockState

```ts

  /**
   * Check if model exists in specific lock state
   * @param {String} lockState
   * @return {Promise}
   */
  SomeModel.isInLockState()

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
