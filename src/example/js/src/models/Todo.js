import HealthStorage from '../../../../../healthStorage'

export default HealthStorage.define(
  'TodoSchema',
  {
    title: {
      type: HealthStorage.STRING
    },
    isCompleted: {
      type: HealthStorage.BOOLEAN
    }
  },
  {
    required: ['md'],
    id: '82897c48-92f8-4a7f-8360-929e8b12356c',
    oId: '82897c48-92f8-4a7f-4550-929e8b12356c'
  }
)
