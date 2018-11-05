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

  var schemaTitle = "SampleSchema";
  var schemaProperties = {
    filename: {
      type: HealthStorage.STRING
    },
    mimetype: {
      type: HealthStorage.STRING
    }
  };
  var schemaOptions = {
    required: []
  };

  const SampleSchema = HealthStorage.define(schemaTitle, schemaProperties, schemaOptions);
  Debug.debugValue("1. Define health storage schema", {schemaTitle, schemaProperties, schemaOptions});

  var schema = SampleSchema.getSchema();
  Debug.debugValue("2. Created health storage schema", schema);
  
  var sdoProperties = {
    filename: "Test Filename",
    mimetype: "application/json"
  }
  var sdoOptions = {
    foo: 'bar'
  }

  var sdoId = SampleSchema.create(sdoProperties, sdoOptions);
  Debug.debugValue("3. Try to create sdo", {sdoProperties, sdoOptions});

} catch (exp) {
    Debug.debugValue(exp);
}

Debug.debugEnd("4. Create SDO");


