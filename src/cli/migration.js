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
        console.log("Created schema id:" + id);
      });
    } catch(e) {
      console.log("Error:" + e.mesage);
    }
  },
  down: () => {
    return HealthStorageODM.deleteSchemaById('21957f53-43ac-4753-815b-e812a135cb01')
  }
}
