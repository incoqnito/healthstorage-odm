'use-strict';

class Debug 
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
        var debugStr = (value != "") ? "========= DEBUG START: " + value + "=========" : "========= DEBUG START: =========";
        console.log("\n" + debugStr + "\n");
    }

    /**
    * Print value
    * @param {*} value 
    */
    debugValue(key, value) 
    {
        console.log(key + ": " + value);
    }

    /**
     * End debugger
     * @param {*} value 
     */
    debugEnd(value = "") 
    {
        var debugStr = (value != "") ? "========= DEBUG END: " + value + "=========" : "========= DEBUG END: =========";
        console.log("\n" + debugStr + "\n");
    }
}

module.exports = new Debug();





