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
            filename: {
                type: HealthStorage.STRING
            },
            mimetype: {
                type: HealthStorage.STRING
            }
        },
        {} // options
    );    

    // Print out found UUID of schema
    Debug.debugValue("UUID", SomeSampleSchema.getUid());

    // Find all SomeSampleObjects
    SomeSampleSchema.findAll({
        filename: {
            value: 'Filename1' 
        }
    },{}).then(
        queryResult => {
            Debug.debugValue("FindAll => Promise answered", queryResult);
        },
        error => {
            Debug.debugValue("FindAll: Promise error", "Database is undefined");
        }
    ); 

} catch (exp) {
    Debug.debugValue(exp);
}


