/** Import modules */
const HealthStorageODM = require("../healthStorage.js");

/** Export functions */
module.exports = {
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
          }
        },
        options: {
          required: ['md']
        }
      }).then(id => {
        console.log("-------------------------------------------");
        console.log("Created schema id:");
        console.log(id)
        console.log("-------------------------------------------");
      });
    } catch(e) {
      console.log("-------------------------------------------");
      console.log("Error:");
      console.log(e.message);
      console.log("-------------------------------------------");
    }
  },
  down: () => {
    return HealthStorageODM.deleteSchema('SampleTest')
  }
}
