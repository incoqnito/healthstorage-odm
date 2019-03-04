/** Export module */
class HsDebugger {

    /**
     * Log key value pair to console
     * @param {String} key 
     * @param {Mixed} value 
     * @param {Boolean} stringify 
     */
    static logConsole(key, value, stringify = false) {
        if(!stringify) {
            console.log(key + ": " + value)
        } else {
            console.log(key + ": " + JSON.stringify(value, null, 2))
        }
    }

    /**
     * Log key value pair to console
     * @param {Mixed} mixed 
     */
    static logTable(mixed) {
        console.table(mixed)
    }
}

export default HsDebugger