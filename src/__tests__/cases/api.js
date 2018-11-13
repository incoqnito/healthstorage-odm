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


// Async => await not working without
(async () => {
    
    try {

        // Define TodoSchema
        const TodoSchema = await HealthStorage.define(
          "TodoSchema",
          {
              title: {
                  type: HealthStorage.STRING
              },
              status: {
                  type: HealthStorage.STRING
              }
          },
          {
              required: ['md'],
              id: id,
              oId: oId
          }
        );

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

        // Get by id
        var TodoSchemaSdoById = await TodoSchema.findById(TodoSchemaCreatedId);
        Debug.debugValue("Data (FindById)", TodoSchemaSdoById);

        // Update sdo item
        var TodoSchemaSdoUpdated = await TodoSchema.update(
            TodoSchemaCreatedId,
            {
                title: "Test789",
                status: "canceled",
                md: {
                    id: TodoSchemaSdoById.md.id,
                    r: TodoSchemaSdoById.md.r + 1,
                    eId: TodoSchemaSdoById.md.eId,
                    sId: TodoSchemaSdoById.md.sId,
                    sr: TodoSchemaSdoById.md.sr,
                    oId: TodoSchemaSdoById.md.oId,
                    tsp: TodoSchemaSdoById.md.tsp
                }
            }
        );
        Debug.debugValue("Sdo (Updated)", TodoSchemaSdoUpdated);

        // Get by id updated
        var TodoSchemaSdoUpdatedById = await TodoSchema.findById(TodoSchemaCreatedId);
        Debug.debugValue("Data (FindById) updated item", TodoSchemaSdoUpdatedById);

        Debug.debugEnd("End API Playground");
        
    } catch (err) {
        console.log(err);
    }

})()


