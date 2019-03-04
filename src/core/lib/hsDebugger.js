/** Export module */
class HsDebugger {

    /**
     * Log key value pair to console
     * @param {String} key 
     * @param {Mixed} value 
     * @param {Boolean} stringify 
     */
    static logConsole(key, value, stringify = false) {
        console.log("HsDebugger BEGIN ===========")
        if(!stringify) {
            console.log(key + ": " + value)
        } else {
            console.log(key + ": " + JSON.stringify(value))
        }
        console.log("HsDebugger END ===========")
    }

    /**
     * Log key value pair to console
     * @param {Mixed} mixed 
     */
    static logTable(mixed) {
        console.log("HsDebugger BEGIN ===========")
        console.table(mixed)
        console.log("HsDebugger END ===========")
    }
}

export default HsDebugger