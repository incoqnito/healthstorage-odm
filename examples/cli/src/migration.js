/** Import modules */
const HealthStorageODM = require('../../../src/healthStorage.js')
const uuid = require('uuid/v4')

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
      if (response.status === 201 || response.status === 204) {
        console.log('Schema successfully deleted.')
      } else {
        console.log('Schema could not deleted.')
      }
    })
  },

  /** Create sdo */
  createSdos: () => {
    return HealthStorageODM.createSdos(
      {
        id: uuid(),
        title: 'Event 1',
        start: new Date('2018-12-15 12:30'),
        end: new Date('2018-12-15 14:30'),
        allDay: false,
        color: '#660066',
        resourceId: uuid(),
        md: {
          'id': this.id,
          'r': 1,
          'eId': '',
          'sId': 'cbd2b7b1-46f9-46d5-8658-2398de990b35',
          'sr': 1,
          'oId': '82897c48-92f8-4a7f-4550-929e8b987654c',
          'tsp': new Date().toISOString()
        }
      },
      {
        id: uuid(),
        title: 'Event 2',
        start: new Date('2018-12-15 16:00'),
        end: new Date('2018-12-15 18:30'),
        allDay: false,
        color: '#FF007F',
        resourceId: uuid(),
        md: {
          'id': this.id,
          'r': 1,
          'eId': '',
          'sId': 'cbd2b7b1-46f9-46d5-8658-2398de990b35',
          'sr': 1,
          'oId': '82897c48-92f8-4a7f-4550-929e8b987654c',
          'tsp': new Date().toISOString()
        }
      }
    )
  }
}
