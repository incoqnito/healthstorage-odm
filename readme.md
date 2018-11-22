# HealthStorageODM

The healthstorage-odm serves the HS storage api. It provides a simple structure to use the interface efficiently and purposefully.

## Features

List coming soon.

## Installing

First install [node.js](https://nodejs.org/en/).

```
npm install healthstorage-odm
```

## Importing

```
// Using ES6 imports
import HealthStorageODM from 'healthstorage-odm';
```
## Overview

### Defining a Model

Defining a model is realized by calling the define-Function of our healtstorage. It returns a model based on given input.

Example:
```
const sampleSchema = HealthStorageODM.define(
  'SomeSchema',
  {
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
  {
    required: [md],
    oId: '1a8a1956-fde7-486f-91b8-ce9a3d9b4be1', // uuid
    id: '5cc6ae3e-bf8f-4be5-b6fb-5de55ca9fd8a' // uuid
  }
)
```

### Model Functions

#### findAll

This function will search after all sdos matching for defined schema.

Example:
```
const sampleSdos = SampleSchema.findAll({
    pageNum: 1,
    pageSize: 15,
    orderBy: 'id',
    orderByDirection: SampleSchema.ASC,
  }
)
```

#### findById

This function search after one sdo by its identifier.

Example:
```
const sampleSdo = SampleSchema.findById('617da75c-9530-4747-a6f3-b7ba168c65ba')
```

#### findOne

This function search after one sdo by given parameters.

Example:
```
const sampleSdo = SampleSchema.findOne({
  field: 'title', 
  value: 'Sample Title',
  operation: '='
})
```

#### create

This function creates a single sdo.

Example:
```
const newSdo = SampleSchema.create({
  title: 'Sample Title', 
  description: 'Sample description',
  price: 45.99,
  online: true,
  hits: 0
})
```

#### updateById

This function updates a sdo find by its identifier.

Example:
```
const updatedSdo = SampleSchema.update(
  '617da75c-9530-4747-a6f3-b7ba168c65ba', 
  {
    title: 'Sample Title', 
    description: 'Sample description',
    price: 45.99,
    online: true,
    hits: 0
  }
)
```

#### update

This function updates sdos find by given parameters.

Example:
```
const updatedSdos = SampleSchema.update(
  '617da75c-9530-4747-a6f3-b7ba168c65ba', 
  {
    title: 'Sample Title', 
    description: 'Sample description',
    price: 45.99,
    online: true,
    hits: 0
  },
  {
    field: 'title', 
    value: 'Sample Title',
    operation: '='
  }
)
```

#### deleteById

This function deletes a sdo find by its identifier.

Example:
```
const updatedSdos = SampleSchema.deleteById('617da75c-9530-4747-a6f3-b7ba168c65ba')
```

#### delete

This function deletes sdos find by given parameters.

Example:
```
const updatedSdos = SampleSchema.delete({
    field: 'title', 
    value: 'Sample Title',
    operation: '='
})
```

#### archiveById

This function archives a sdo find by its identifier.

Example:
```
const updatedSdos = SampleSchema.archiveById('617da75c-9530-4747-a6f3-b7ba168c65ba')
```

#### archive

This function archives sdos find by given parameters.

Example:
```
const updatedSdos = SampleSchema.archive({
    field: 'title', 
    value: 'Sample Title',
    operation: '='
})
```

## Installing Sample App

### Install npm-packages

Open console healthstorage-odm package and move to ````./src/example/```. Type in ```npm install``` and install dependencies. 

### Run app

Important: First install all dependencies.

Open console healthstorage-odem package and move to ````./src/example/```. Type in ```npm start``` to run webpack.
After successfully created the files move to the link shown in console (eg. http://localhost:8080, http://localhost:8081, http://localhost:8082, ...)

Enjoy.
