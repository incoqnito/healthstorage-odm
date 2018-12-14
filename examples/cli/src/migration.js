/** Import modules */
const HealthStorageODM = require('../../../src/healthStorage.js')

HealthStorageODM.createClient()

/** Export functions */
module.exports = {
  /**
   * Create schema
   */
  up: () => {
    try {
      return HealthStorageODM.createSchema({
        title: 'EventSchema',
        properties: {
          id: {
            type: HealthStorageODM.STRING
          },
          title: {
            type: HealthStorageODM.STRING
          },
          start: {
            type: HealthStorageODM.DATE
          },
          end: {
            type: HealthStorageODM.DATE
          },
          allDay: {
            type: HealthStorageODM.BOOLEAN
          },
          color: {
            type: HealthStorageODM.STRING
          },
          resourceId: {
            type: HealthStorageODM.STRING
          }
        },
        options: {
          required: ['md']
        }
      }).then(schema => {
        console.log('Created schema id:' + schema.$id)
      })
    } catch (e) {
      console.log('Error:' + e.mesage)
    }
  },

  /**
   * Delete schema by its identifier
   */
  down: () => {
    return HealthStorageODM.deleteSchemaById('42479354-e9be-4a99-8477-5eb98404fbd8').then(response => {
      console.log('Schema successfully deleted.')
    })
  },

  /** Create sdo */
  create: () => {
    return HealthStorageODM.createSdo(
      {

      }
    )
  }
}
