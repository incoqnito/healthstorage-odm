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
        {
            required: [],
            additionalProperties: false
        }
    );    

    SomeSampleSchema.create(
        {
            filename: "testtest",
            mimetype: "test"
        },
        {}
    );

} catch (exp) {
    Debug.debugValue(exp);
}

Debug.debugEnd("4. Create SDO");


