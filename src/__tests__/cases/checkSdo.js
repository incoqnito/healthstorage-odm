/**
 * Test Case - Check given SDO Title and Options
 * node ./src/__tests__/cases/checkSDO.js
 * @argument SDOFilename
 * @argument Options
 */

require('@babel/register');

import HealthStorage from "../../healthStorage";
import Debug from "../debug/debug";

var args = process.argv.slice(2);

if(args!== undefined && args[0] !== undefined && args[1] !== undefined) {
    var sdoTitle = args[0];
    var options = args[1];
    
    Debug.debugStart("Check define variables");

    try {

        HealthStorage.define(sdoTitle, options);
        var returnTitle = HealthStorage.getSdoTitle();
        var returnOptions = HealthStorage.getSdoOptions();
        
        Debug.debugValue("SdoTitle", returnTitle);
        Debug.debugValue("Sdooptions", returnOptions);

    } catch(exp) {
        Debug.debugValue(exp);
    }

    Debug.debugEnd("Check define variables");

} else {
    Debug.debugValue("Error - No arguments passed to script :(");
}



