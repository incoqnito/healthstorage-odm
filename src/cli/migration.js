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
          },
          locked: {
            type: HealthStorageODM.OBJECT
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

  /**
   * Delete schema by its identifier
   * @todo Delete by name: api currently not supporting find by name / delete by name
   */
  downById: () => {
    return HealthStorageODM.deleteSchemaById('d7e6a014-1aa3-44e1-b0f3-357e4618618c1de')
  }
}
