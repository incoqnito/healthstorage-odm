import HealthStorageODM from '../../../../../src/healthStorage'

HealthStorageODM.createClient()

export default HealthStorageODM.define({
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
    required: ['md'],
    id: 'cbd2b7b1-46f9-46d5-8658-2398de990b35',
    oId: '82897c48-92f8-4a7f-4550-929e8b987654c',
    r: 1
  }
})
