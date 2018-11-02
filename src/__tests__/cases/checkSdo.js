/**
 * Test Case - Check given SDO Title and Options
 * node ./src/__tests__/cases/checkSDO.js
 *
 * Test if Debugger works properly
 * 
 * @argument sdoName
 * @argument Options
 */

require('@babel/register');

import HealthStorage from "../../healthStorage";
import Debug from "../debug/debug";

var args = process.argv.slice(2);

if (args !== undefined && args[0] !== undefined && args[1] !== undefined) {
    
    var sdoName = args[0];
    var options = args[1];

    Debug.debugStart("Check define variables");

    try {

        var hs = HealthStorage.define(sdoName, options);
        var returnTitle = hs.getTitle();
        var returnOptions = hs.getOptions();

        Debug.debugValue("SdoTitle", returnTitle);
        Debug.debugValue("SdoOptions", returnOptions);

    } catch (exp) {
        Debug.debugValue(exp);
    }

    Debug.debugEnd("Check define variables");

} else {
    Debug.debugValue("Error - No arguments passed to script :(");
}



