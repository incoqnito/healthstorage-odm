import HealthStorageODM from '../../../../src/healthStorage'

export default HealthStorageODM.define('TodoSchema', {
  title: {
    type: HealthStorageODM.STRING
  },
  isCompleted: {
    type: HealthStorageODM.BOOLEAN
  }
}, {
  required: ['md'],
  id: '82897c48-92f8-4a7f-8360-929e8b12356c',
  oId: '82897c48-92f8-4a7f-4550-929e8b12356c',
  r: 1
})