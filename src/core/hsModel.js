/** Get constants */
import { ASC } from "./constants/hsConstants"
import { DESC } from "./constants/hsConstants"
import { MD_ID } from "./constants/hsConstants"
import { MD_REVISION } from "./constants/hsConstants"
import { MD_DATE } from "./constants/hsConstants"

export default class HsModel {
    
    /**
     * Constructor
     * @param {Object} schema 
     * @param {Object} opts 
     */
    constructor(opts) {
        this._props = {}
        this.initProperties(opts)
    }

    /**
     * Get sort asc type
     * @return {String} ASC
     */
    static get ASC () {
        return ASC
    }

    /**
     * Get sort desc type
     * @return {String} DESC
     */
    static get DESC () {
        return DESC
    }

    /**
     * Get meta id type
     * @return {String} MD_ID
     */
    static get MD_ID () {
        return MD_ID
    }

    /**
     * Get meta revision type
     * @return {String} MD_REVISION
     */
    static get MD_REVISION () {
        return MD_REVISION
    }

    /**
     * Get meta date type
     * @return {String} MD_DATE
     */
    static get MD_DATE () {
        return MD_DATE
    }

    /**
     * Create new instance of model with given schema
     * @param {Object} schema 
     */
    static instance(schema, adapter) {
        this.HsSchema = schema
        this.HsAdapter = adapter
    }

    /**
     * Get all sdos from owner and schema
     * @param {Object} data
     * @returns {Promise}
     */
    static findAll(options) {
        return HsModel.HsAdapter.getSdos(HsModel.HsSchema.props.oId, HsModel.HsSchema.props.id, options).then(response => {
            var list = response.body.map(sdo => new HsModel(sdo))
            return {
              list: list,
              headers: response.headers
            }
        })
    }
    
    /**
     * Get sdo by where
     * @param {String} id
     * @returns {Promise}
     * @issue filters not working on, currently implemented by find all and custom search
     */
    static findOne(where) {
        if(where === undefined) return Promise.resolve({})   
        return this.findAll()
            .then(sdos => {
                let matchedEntries = []
                sdos.list.forEach(models => {
                    Object.keys(where).forEach(key => {
                        if(models[key] === where[key]) matchedEntries.push(models)
                    })
                })
                return (matchedEntries[0] !== undefined) ? matchedEntries[0] : false
            })
    }

    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     * @issue API not returns created object, workaround implemented for sdo and sdoBlob
     */
    create (props) {
        let propsForSdo = Object.assign(props, {md: HsModel.HsSchema.generateMd()})
        return HsModel.HsAdapter.validateSdo(propsForSdo).then(validated => {
            if (validated) {
                return HsModel.HsAdapter.createSdo(propsForSdo).then(sdo => new HsModel(sdo))
            }
        })
    }

    /**
     * Init props of instance
     * @param {Object} props
     */
    initProperties (props) {
        this._props = props
        for (let key in this._props) {
            Object.defineProperty(this, key, {
                get: function () { return this._props[key] },
                set: function (value) {
                    if (this._props[key] !== value) {
                        this._props[key] = value
                    }
                }
            })
        }
    }

    /**
     * Save created model with its properties
     */
    save() {
        return this.create(this._props)
    }
}