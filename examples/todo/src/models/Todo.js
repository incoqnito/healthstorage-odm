import HealthStorageODM from '../../../../src/healthStorage'

var client = new HealthStorageODM({
  serverUrl: 'http://localhost:8080',
  adapter: HealthStorageODM.HS_STORAGE_ADAPTER
})

export default client.define({
  title: 'TodoSchema',
  properties: {
    title: {
      type: HealthStorageODM.STRING
    },
    isCompleted: {
      type: HealthStorageODM.INTEGER
    },
    lockValue: {
      type: HealthStorageODM.STRING
    }
  },
  options: {
    required: ['md'],
    id: '82897c48-92f8-4a7f-8360-929e8b12356c',
    oId: '82897c48-92f8-4a7f-4550-929e8b12356c',
    r: 1
  }
})
