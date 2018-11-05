
class AjvInvalidError extends Error {
  constructor(message) {
    super(message);
    this.name = "AjvInvalidError";
    this.stack = "";
  }
}

module.exports = AjvInvalidError;