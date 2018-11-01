'use-strict';

class HealthStorage
{
    /**
     * Cosntruct
     */
    constructor() {}

    /**
     * Define function 
     * @param {String} sdoTitle Title of the SDO
     * @param  {Object} options Options object
     */
    define(sdoTitle, options) 
    {
        this.sdoTitle = sdoTitle;
        this.sdoOptions = options;
    }

    /**
     * Return SDO title
     * @returns {String}
     */
    getSdoTitle()
    {
        return this.sdoTitle;
    }

    /**
     * Return SDO options
     * @returns {Object}
     */
    getSdoOptions()
    {
        return this.sdoOptions;
    }
}

module.exports = new HealthStorage();