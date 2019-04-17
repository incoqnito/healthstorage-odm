/** imports */
import HsBlob from "./hsBlob"

/** get constants */
import { ASC } from "./constants/hsConstants"
import { DESC } from "./constants/hsConstants"
import { MD_ID } from "./constants/hsConstants"
import { MD_REVISION } from "./constants/hsConstants"
import { MD_DATE } from "./constants/hsConstants"
import { FILTER_REQUEST } from "./constants/hsConstants"
import { FILTER_REQUEST_FILTER } from "./constants/hsConstants"
import { FILTER_REQUEST_SORT } from "./constants/hsConstants"
import { EQUAL } from "./constants/hsConstants"
import { NOT_EQUAL } from "./constants/hsConstants"
import { CONTAINS } from "./constants/hsConstants"
import { NOT_CONTAIN } from "./constants/hsConstants"
import { START_WITH } from "./constants/hsConstants"
import { END_WITH } from "./constants/hsConstants"
import { LOWER_THAN } from "./constants/hsConstants"
import { LOWER_EQUAL_THAN } from "./constants/hsConstants"
import { GREATER_THAN } from "./constants/hsConstants"
import { GREATER_EQUAL_THAN } from "./constants/hsConstants"
import { AND } from "./constants/hsConstants"
import { OR } from "./constants/hsConstants"

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
     * @return {String}
     */
    static get ASC () {
        return ASC
    }

    /**
     * Get sort desc type
     * @return {String}
     */
    static get DESC () {
        return DESC
    }

    /**
     * Get meta id type
     * @return {String}
     */
    static get MD_ID () {
        return MD_ID
    }

    /**
     * Get meta revision type
     * @return {String}
     */
    static get MD_REVISION () {
        return MD_REVISION
    }

    /**
     * Get meta date type
     * @return {String}
     */
    static get MD_DATE () {
        return MD_DATE
    }

    /**
     * Get filter request
     * @return {Object}
     */
    static get FILTER_REQUEST () {
        return FILTER_REQUEST
    }

    /**
     * Get filter request sort options
     * @return {Object}
     */
    static get FILTER_REQUEST_SORT () {
        return FILTER_REQUEST_SORT
    }

    /**
     * Get filter request filter options
     * @return {Object}
     */
    static get FILTER_REQUEST_FILTER () {
        return FILTER_REQUEST_FILTER
    }

    /**
     * Get equal compare type
     * @return {String}
     */
    static get EQUAL () {
        return EQUAL
    }

    /**
     * Get not equal compare type
     * @return {String}
     */
    static get NOT_EQUAL () {
        return NOT_EQUAL
    }

    /**
     * Get contains compare type
     * @return {String}
     */
    static get CONTAINS () {
        return CONTAINS
    }

    /**
     * Get not contains compare type
     * @return {String}
     */
    static get NOT_CONTAIN () {
        return NOT_CONTAIN
    }

    /**
     * Get lower than compare type
     * @return {String}
     */
    static get LOWER_THAN () {
        return LOWER_THAN
    }

    /**
     * Get lower equal than compare type
     * @return {String}
     */
    static get LOWER_EQUAL_THAN () {
        return LOWER_EQUAL_THAN
    }

    /**
     * Get greater than compare type
     * @return {String}
     */
    static get GREATER_THAN () {
        return GREATER_THAN
    }

    /**
     * Get greater equal than compare type
     * @return {String}
     */
    static get GREATER_EQUAL_THAN () {
        return GREATER_EQUAL_THAN
    }

    /**
     * Get starts with compare type
     * @return {String}
     */
    static get START_WITH () {
        return START_WITH
    }

    /**
     * Get ends with compare type
     * @return {String}
     */
    static get END_WITH () {
        return END_WITH
    }

    /**
     * Get logic and type
     * @return {String}
     */
    static get AND () {
        return AND
    }

    /**
     * Get logic or type
     * @return {String}
     */
    static get OR () {
        return OR
    }

    /**
     * Create new instance of model with given schema
     * @param {Object} schema 
     */
    static instance(schema, adapter, identifier) {
        this.HsSchema = schema
        this.HsAdapter = adapter
        this.HsIdentifier = identifier
    }

    /**
     * Get all sdos from owner and schema
     * @param {Object} data
     * @returns {Promise}
     */
    static find(options) {
        return HsModel.HsAdapter.getSdos(HsModel.HsSchema.props.oId, HsModel.HsSchema.props.id, options).then(response => {
            return (response.body !== undefined && response.body.length > 0) ? response.body.map(sdo => new HsModel(sdo)) : false
        })
    }

    /**
     * Get sdo by identifier
     * @param {String} id
     * @returns {Promise}
     */
    static findById (id) {
        return HsModel.HsAdapter.getSdo({id: id}).then(sdo => {
            let model = new HsModel(sdo)
            model.lockValue = lockValue !== null ? JSON.parse(lockValue) : null
            return model
        })
    }
    
    /**
     * Get sdo by where
     * @param {String} id
     * @returns {Promise}
     */
    static findOne(where, opts = {}) {
        let filterRequest = HsModel.FILTER_REQUEST
        
        filterRequest.sort = (opts.sort === undefined) ? HsModel.FILTER_REQUEST_SORT : opts.sort
        filterRequest.filter.logic = (opts.logic === undefined) ? filterRequest.filter.logic : opts.logic 

        filterRequest.filter.filters = Object.keys(where).map(whereKey => {
            let filterObject = Object.assign({}, HsModel.FILTER_REQUEST_FILTER, {
                'field': whereKey,
                'operator': HsModel.EQUAL,
                'value': where[whereKey]
            })
            return filterObject
        })

        return HsModel.find({filter: filterRequest}).then(modelOrModels => modelOrModels[0])
    }

    /**
     * Get sdo by where and update it
     * @param {String} id
     * @returns {Promise}
     */
    static async findOneAndUpdate(where, update, opts = {}) {
        return HsModel.findOne(where, opts)
            .then(matchedModel => {
                Object.assign(matchedModel, update.$set)
                return matchedModel.update()
                    .then(updatedModel => updatedModel)
                    .catch(error => error)
            })
            .catch(error => error)
    }

    /**
     * Get blob by identifier
     * @param {String} id
     * @returns {Promise}
     */
    static findBlobById (id) {
        return HsModel.HsAdapter.getSdoBlob({id: id}).then(blob => {
            return blob
        })
    }

    /**
     * Get blob by identifier
     * @param {String} id
     * @returns {Promise}
     */
    static findBlobFileById (id, blobId) {
        return HsModel.HsAdapter.getSdoBlobFile({id: id, blobId: blobId}).then(blob => {
            return blob
        })
    }

    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     * @issue API not returns created object, workaround implemented for sdo and sdoBlob
     */
    static create (props) {
        let propsForSdo = Object.assign(props, {md: HsModel.HsSchema.generateMd()})

        let files = null
        if(propsForSdo.files !== undefined && propsForSdo.files.length > 0) files = propsForSdo.files
        delete propsForSdo.files

        return HsModel.HsAdapter.validateSdo(propsForSdo).then(validated => {
            if (validated) {
                if(files === null) {
                    return HsModel.HsAdapter.createSdo(propsForSdo).then(sdo => new HsModel(sdo))
                } else {
                    propsForSdo['files'] = files
                    let hsBlob = HsModel.sdoBlobBridge(propsForSdo)
                    return HsModel.HsAdapter.createSdoBlob(hsBlob.blobFormData).then(sdo => HsModel({
                        ...propsForSdo,
                        'blobRefs': hsBlob.sdo.blobRefs
                        }
                    ))
                }
            }
        })
    }

    /**
     * Check if sdo changed since specified item
     * @param {String} sdoId
     * @param {String} r
     * @returns {Promise}
     */
    static changedSinceByIdAndRevision (sdoId, r) {
        return HsModel.HsAdapter.sdoHasChanged(sdoId, r).then(response => {
            return response
        })
    }

    /** 
     * Update sdo by its identifier
     * @param {Object} data
     * @returns {HsModel} 
     */
    static updateById (data) {
        data.md.r += 1
        return HsModel.HsAdapter.validateSdo(data).then(validated => {
            if (validated) {
                return HsModel.HsAdapter.editSdo(data).then(sdo => new HsModel(sdo))
            }
        })
    }

    /**
     * Update sdos by given where
     * @param {Object} where 
     * @param {Object} data 
     */
    static updateWhere (where, data) {
        console.log('Update sdo by where')
    }

    /**
     * Bulk create sdos
     * @param {Array} bulkList
     * @returns {Promise}
     */
    static bulkCreate (bulkList) {
        console.log('Bulk create sdos')
    }

    /**
     * Bulk update sdos
     * @param {Array} bulkList
     * @returns {Promise}
     */
    static bulkUpdate (bulkList) {
        let collectedSods = bulkList.map(item => {
            item.md.r += 1
            return item
        })
        return HsModel.HsAdapter.editSdosBulk(collectedSods).then(response => {
            return response
        })
    }

    /**
     * Archive sdo by its identifier
     * @returns {Promise}
     */
    static archiveById (id) {
        console.log('Archive sdo by its identifier')
    }

    /**
     * Archive sdos by given where
     * @returns {Promise}
     */
    static archiveWhere (where) {
        console.log('Archive sdos by where')
    }

    /**
     * Lock object by its identifier
     * @param {String} id
     * @returns {Object}
     */
    static lockById (id) {
        return HsModel.HsAdapter.lockItem(id).then(lockValue => {
            return lockValue
        })
    }

    /**
     * Lock object by its identifier
     * @param {String} id
     * @returns {Object}
     */
    static unlockById (id, lockValueId) {
        return HsModel.HsAdapter.unlockItem(id, lockValueId).then(response => {
            return response !== undefined
        })
    }

    /**
     * Get lock value on sdo by its identifier and lock value
     * @param {String} sdoId
     * @param {String} lockValue
     */
    static getLockDataById (sdoId, lockValueId) {
        return HsModel.HsAdapter.getLockData(sdoId, lockValueId).then(response => {
            return response
        })
    }

    /**
     * Check if sdo is locked
     * @param {String} sdoId
     * @param {String} lockValue
     */
    static isLockedById (sdoId, lockValueId) {
        return HsModel.HsAdapter.isLockedItem(sdoId, lockValueId).then(response => {
            return response
        })
    }

    /**
     * Check if sdo exists with lock State
     * @param {String} sdoId
     * @param {Boolean} lockState
     */
    static existsInLockStateById (sdoId, lockState) {
        return HsModel.HsAdapter.existInLockState(sdoId, lockState).then(response => {
            return response
        })
    }

    /**
     * Delete sdo by its identifier
     * @param {String} id
     * @param {Object} data
     */
    static deleteById (id) {
        return HsModel.HsAdapter.deleteSdo(id).then(response => {
            return response
        })
    }

    /**
     * Delete sdo by where
     * @param {String} id
     * @param {Object} data
     */
    static deleteWhere (where) {
       console.log("Delete sdos by where")
    }

    /**
     * Get archive for sdo
     * @param {String} sdoId
     * @param {Integer} pageNo
     * @param {Integer} pageSize
     * @returns {Promise}
     */
    static getArchiveBySdoId (sdoId, pageNo = 1, pageSize = 10) {
        return HsModel.HsAdapter.getSdoArchive(sdoId, pageNo, pageSize).then(response => {
            return response.body.length !== undefined ? response.body : false
        })
    }

    /**
     * Get revisons archive for sdo
     * @param {String} sdoId
     * @returns {Promise}
     */
    static getRevisionsArchiveBySdoId (sdoId) {
        return HsModel.HsAdapter.getSdoRevisionsArchive(sdoId).then(response => {
            return response
        })
    }

    /**
     * Find meta fields
     * @param {String} key meta field key
     * @returns {String}
     */
    static findMetaField (key) {
        var value = ''
        switch (key) {
            case 'id':
                value = HsModel.MD_ID
                break
            case 'r':
                value = HsModel.MD_REVISION
                break
            case 'tsp':
                value = HsModel.MD_DATE
                break
        }
        return value
    }

    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     */
    static createBlob (sdoBlob) {
        let sdo = JSON.parse(sdoBlob.getAll('sdo'))
        sdo['md'] = HsModel.HsSchema.generateMd()
        return HsModel.HsAdapter.validateSdo(sdo).then(validated => {
            if (validated) {
                sdoBlob.set('sdo', JSON.stringify(sdo))
                return HsModel.HsAdapter.createSdoBlob(sdoBlob).then(response => {
                    return response
                })
            }
        })
    }

    /**
     * Data Bridge for blob creation
     * @param {Object} data 
     */
    static sdoBlobBridge(data) {
        return new HsBlob(data)
    }

    /**
     * Init props of instance
     * @param {Object} props
     */
    initProperties (props) {
        if(props.md !== undefined && props.md.id !== undefined) this['_id'] = props.md.id
        if(props.md !== undefined && props.md.r !== undefined) this['__v'] = props.md.r

        for (let key in props) {
            this[key] = props[key]
        }
    }

    /**
     * Save created model with its properties
     * @return {Promise}
     */
    save() {
        return HsModel.create(this)
    }

    /**
     * Update model with given data
     * @return {Promise}
     */
    update() {
        return HsModel.updateById(this)
    }

    /**
     * Delete model by identifier
     * @return {Promise}
     */
    destroy() {
        return HsModel.deleteById(this._id)
    }

    /**
     * Get attached File from model
     * @return {Promise}
     */
    getFile() {
        return HsModel.findBlobFileById(this._id, this.blobRefs[0])
    }

    /**
     * Archive model
     * @return {Promise}
     */
    archive() {
        return HsModel.archiveById(this._id)
    }

    /**
     * Get archived revison numbers for model
     * @return {Promise}
     */
    getArchivedRevisions() {
        return HsModel.getRevisionsArchiveBySdoId(this._id)
    }

    /**
     * Get archived sdos mof model
     * @param {Integer} pageNo
     * @param {Integer} pageSize
     * @return {Promise}
     */
    getArchive(pageNo = 1, pageSize = 10) {
        return HsModel.getArchiveBySdoId(this._id, pageNo, pageSize)
    }

    /**
     * Check model last change since
     * @return {Promise}
     */
    changedSince() {
        return HsModel.changedSinceByIdAndRevision(this._id, this.__v)
    }

    /**
     * Lock model
     * @return {Promise}
     */
    lock() {
        return HsModel.lockById(this._id)
    }

    /**
     * Unlock model
     * @return {Promise}
     */
    unlock() {
        return HsModel.unlockById(this._id)
    }

    /**
     * Get lock data for model
     * @return {Promise}
     */
    getLockData() {
        return HsModel.getLockDataById(this._id, this.lockValue.value)
    }

    /**
     * Check if model is locked
     * @return {Promise}
     */
    isLocked() {
        return HsModel.isLockedById(this._id)
    }

    /**
     * Check if model exists in specific lock state
     * @param {String} lockState
     * @return {Promise}
     */
    isInLockState(lockState) {
        return HsModel.existsInLockStateById(this._id, lockState)
    }
}