'use-strict';

class DebugHandler 
{
    /**
     * Construct
     */
    constructor() { }

    /**
     * Start debugger
     * @param {*} value 
     */
    debugStart(value = "") 
    {
        var debugStr = (value != "") ? "========= DEBUG START: " + value + " =========" : "========= DEBUG START: =========";
        console.log("\n" + debugStr + "\n");
    }

    /**
    * Print value
    * @param {*} value 
    */
    debugValue(key, value, table = false) 
    {
        console.log(key);
        console.log("---------------------------------------------------------");
        if(!table){
            console.log(JSON.stringify(value));
        } else {
            console.table(value);
        }
        console.log("---------------------------------------------------------");
    }

    /**
     * End debugger
     * @param {*} value 
     */
    debugEnd(value = "") 
    {
        var debugStr = (value != "") ? "========= DEBUG END: " + value + " =========" : "========= DEBUG END: =========";
        console.log("\n" + debugStr + "\n");
    }
}

module.exports = new DebugHandler();





