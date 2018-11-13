class SchemaValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SchemaValidationError";
    this.stack = "";
  }
}

module.exports = SchemaValidationError;
