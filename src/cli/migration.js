/** Import modules */
const HealthStorageODM = require("../healthStorage.js");

/** Export functions */
module.exports = {
  up: () => {
    console.log(HealthStorageODM);
    try {
      return HealthStorageODM.createSchema({
        title: 'TestSchema', 
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
      })
    } catch(e) {
      console.log(e.message);
    }
  },
  down: () => {
    return HealthStorageODM.deleteSchema('SampleTest')
  }
}
