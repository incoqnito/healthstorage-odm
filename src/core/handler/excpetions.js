class SchemaValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SchemaValidationError";
    this.stack = "";
  }
}

class PropertyValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "PropertyValidationError";
    this.stack = "";
  }
}

module.exports = SchemaValidationError;
module.exports = PropertyValidationError;
