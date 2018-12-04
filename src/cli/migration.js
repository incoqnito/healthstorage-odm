/** Import modules */
const HealthStorageODM = require("../healthStorage.js");

/** Export functions */
module.exports = {
  up: () => {
    console.log(HealthStorageODM);
    return HealthStorageODM.createSchema({
      title: 'TodoSchema', 
      properties: {
        title: {
          type: HealthStorageODM.STRING
        },
        isCompleted: {
          type: HealthStorageODM.BOOLEAN
        }
      },
      options: {
        required: ['md']
      }
    }).catch(error => {
      console.log(error)
    });
  },
  down: () => {
    return HealthStorageODM.deleteSchema('SampleTest')
  }
}
