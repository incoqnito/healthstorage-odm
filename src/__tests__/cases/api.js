/**
 * Test Case - Test Api functions
 * node ./src/__tests__/cases/api.js
 */
require('babel-polyfill');
require('@babel/register');

import HealthStorage from "../../healthStorage";
import Debug from "../debug/debug";


var id = "82897c48-92f8-4a7f-8360-929e8b12356c";
var oId = "82897c48-92f8-4a7f-4550-929e8b12356c";

Debug.debugStart("API Playground");

// Define TodoSchema
const TodoSchema = HealthStorage.define(
  "TodoSchema",
  {
      id: {
          type: HealthStorage.STRING
      },
      title: {
          type: HealthStorage.STRING
      },
      status: {
          type: HealthStorage.STRING
      }
  },
  {
      id: id,
      oId: oId
  }
);

// Async => await not working without
(async () => {

    try {

        // Create Todo Item
        var TodoSchemaCreatedId = await TodoSchema.create(
            {
                title: "Test",
                staus: "open"
            }
        );
        Debug.debugValue("SdoId (Create)", TodoSchemaCreatedId);
        
        // Get all Todos
        var TodoSchemaSdos = await TodoSchema.findAll();
        Debug.debugValue("Data (FindAll)", TodoSchemaSdos);

        // Update sdo item
        // var TodoSchemaSdoUpdated = await TodoSchema.update(
        //     TodoSchemaCreatedId,
        //     {
        //         title: "Test 34",
        //         status: "working"
        //     }
        // );
        // Debug.debugValue("Sdo (Updated)", TodoSchemaSdoUpdated);

        Debug.debugEnd("End API Playground");
        
    } catch (err) {
        console.log(err);
    }

})()


