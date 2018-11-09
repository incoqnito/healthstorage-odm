/**
 * Test Case - Test Api functions
 * node ./src/__tests__/cases/api.js
 */

require('@babel/register');

import HealthStorage from "../../healthStorage";
import Debug from "../debug/debug";

Debug.debugStart("Create SDO");

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
  {} // options
);  

