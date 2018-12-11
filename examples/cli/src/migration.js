/** Import modules */
const HealthStorageODM = require('../../../src/healthStorage.js')

/** Export functions */
module.exports = {
  /**
   * Create schema
   */
  up: () => {
    try {
      return HealthStorageODM.createSchema({
        title: 'TestSchema2',
        properties: {
          title: {
            type: HealthStorageODM.STRING
          },
          isCompleted: {
            type: HealthStorageODM.BOOLEAN
          },
          locked: {
            type: HealthStorageODM.OBJECT
          }
        },
        options: {
          required: ['md']
        }
      }).then(id => {
        console.log('Created schema id:' + id)
      })
    } catch (e) {
      console.log('Error:' + e.mesage)
    }
  },

  /**
   * Delete schema by its identifier
   */
  down: () => {
    return HealthStorageODM.deleteSchemaById('902ab03f-ae56-4219-9708-420fd6e60321')
  }
}
