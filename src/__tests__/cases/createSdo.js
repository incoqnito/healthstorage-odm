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

var schema = require("./../schema/sample.json");
var args = process.argv.slice(2);

if (schema !== undefined) {
    
    Debug.debugStart("Create SDO");

    try {
      console.log(HealthStorage.STRING);
      const SampleSchema = HealthStorage.define(
        "Sample",
        {
          filename: {
            type: HealthStorage.STRING
          },
          mimetype: {
            type: HealthStorage.STRING
          }
        }
      );

    } catch (exp) {
        Debug.debugValue(exp);
    }

    Debug.debugEnd("Create SDO");

} else {
    Debug.debugValue("Error - No arguments passed to script :(");
}

