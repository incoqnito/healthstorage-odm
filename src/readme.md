# HealthStorage ODM

The healthstorage-odm serves the HS storage api. It provides a simple structure to use the interface efficiently and purposefully.

## Features

List coming soon.

## Installing

First install [node.js] (https://nodejs.org/en/).

```
npm install healthstorage-odm
```

## Importing

```
// Using ES6 imports
import HealthStorage from 'healthstorage-odm';
```
## Overview

### Defining a Model

```
export default HealthStorage.define(
  'SomeSchema',
  {
    title: {
      type: HealthStorage.STRING
    },
    description: {
      type: HealthStorage.STRING
    },
    ranking: {
      type: HealthStorage.DOUBLE
    },
    online: {
      type: HealthStorage.BOOLEAN
    },
    hits: {
      type: HealthStorage.INTEGER
    }
  },
  {
    // some options
  }
)
```
