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

  var schema = SampleSchema.getSchema();
  Debug.debugValue("Created schema", schema);

} catch (exp) {
    Debug.debugValue(exp);
}

Debug.debugEnd("Create SDO");


