#!/usr/bin/env node
const HealthStorageODM = require("./../healthStorage.js");
try {
  HealthStorageODM.define({
    title: 'TodoSchema', 
    properties: {
      title: {
        type: HealthStorageODM.STRING
      },
      isCompleted: {
        type: HealthStorageODM.BOOLEAN
      }
    }, 
    options: {
      required: ['md'],
      id: '82897c48-92f8-4a7f-8360-929e8b12356c',
      oId: '82897c48-92f8-4a7f-4550-929e8b12356c',
      r: 1
    }
  });
  console.log(HealthStorageODM)
} catch(e) {
  console.log(e.message)
}

