/**
 * Test Case - Create a new SDO schema
 * node ./src/__tests__/cases/createSdo.js
 * 
 * @argument sdoName
 * @argument Options
 */

require('@babel/register');

import HealthStorage from "../../healthStorage";
import Debug from "../debug/debug";

var args = process.argv.slice(2);

Debug.debugStart("Create SDO");

try {

    // Define SomeSampleSchema
    const SomeSampleSchema = HealthStorage.define(
        "SomeSampleSchema",
        {
            id: {
                type: HealthStorage.INTEGER
            },
            filename: {
                type: HealthStorage.STRING
            },
            mimetype: {
                type: HealthStorage.STRING
            }
        },
        {} // options
    );   

    // Find all SomeSampleObjects
    SomeSampleSchema.findAll({},{}).then(
        queryResult => {
            Debug.debugValue("FindAll (no where) => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("FindAll (no where): Promise error", "Database is undefined");
        }
    ); 
    
    // Find all SomeSampleObjects matched for where
    SomeSampleSchema.findAll({
        filename: {
            value: 'Filename1',
            operation: HealthStorage.EQUAL
        }
    },{}).then(
        queryResult => {
            Debug.debugValue("FindAll (EQUAL) => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("FindAll (EQUAL): Promise error", "Database is undefined");
        }
    ); 


    // Find all SomeSampleObjects matched for where
    SomeSampleSchema.findAll({
        filename: {
            value: 'Filename1',
            operation: HealthStorage.UNEQUAL
        }
    },{}).then(
        queryResult => {
            Debug.debugValue("FindAll (UNEQUAL) => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("FindAll (UNEQUAL): Promise error", "Database is undefined");
        }
    ); 

    // Find all SomeSampleObjects matched for where
    SomeSampleSchema.findAll({
        filename: {
            value: 'Filename1',
            operation: HealthStorage.LIKE
        }
    },{}).then(
        queryResult => {
            Debug.debugValue("FindAll (LIKE) => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("FindAll (LIKE): Promise error", "Database is undefined");
        }
    ); 

    // Find one
    SomeSampleSchema.findOne({
        'filename': {
        value: "Filename1",
        operation: HealthStorage.EQUAL
        }
    }).then(
        queryResult => {
            Debug.debugValue("FindOne (filename) => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("FindOne (filename) => Promise error", "Database is undefined");
        }
    );

    // Find one
    SomeSampleSchema.findOne({
        'filename': {
           value: "Filename1",
           operation: HealthStorage.LIKE
        }
    }).then(
       queryResult => {
           Debug.debugValue("FindOne (like Filename1) => Promise answered", queryResult, true);
       },
       error => {
           Debug.debugValue("FindOne (like Filename1) => Promise error", "Database is undefined");
       }
   ); 

   // Find one
   SomeSampleSchema.create({
        'filename': "Currently created",
        'mimetype': "type/best",
    }).then(
        queryResult => {
            Debug.debugValue("Create => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("Create => Promise error", "Database is undefined");
        }
    );

    // Find one (new created)
    SomeSampleSchema.findOne({
        'mimetype': {
           value: "type",
           operation: HealthStorage.LIKE
        }
    }).then(
       queryResult => {
           Debug.debugValue("FindOne (like type currently created) => Promise answered", queryResult, true);
       },
       error => {
           Debug.debugValue("FindOne (like type currently created) => Promise error", "Database is undefined");
       }
    ); 

    // Find one (new created)
    SomeSampleSchema.findById(3).then(
       queryResult => {
           Debug.debugValue("FindById => Promise answered", queryResult, true);
       },
       error => {
           Debug.debugValue("FindById => Promise error", "Database is undefined");
       }
    ); 

    // Find one (new created)
    SomeSampleSchema.updateById(2, {
        filename: "Filename Override"
    }).then(
        queryResult => {
            Debug.debugValue("UpdateById => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("UpdateById => Promise error", "Database is undefined");
        }
     ); 

    // Find one (new created)
    SomeSampleSchema.update({
        filename: {
            value: "Filename1",
            operation: HealthStorage.EQUAL
        }
    }, {
        filename: "Filename Override 2",
        mimetype: "Mimetype Override 2"
    }).then(
        queryResult => {
            Debug.debugValue("Update => Promise answered", queryResult, true);
        },
        error => {
            Debug.debugValue("Update => Promise error", "Database is undefined");
        }
     ); 

} catch (exp) {
    Debug.debugValue(exp);
}