
class AjvInvalidError extends Error {
  constructor(message) {
    super(message);
    this.name = "AjvInvalidError";
    this.stack = "";
  }
}

class NoTitleForModelError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoTitleForModelError";
    this.stack = "";
  }
}

module.exports = AjvInvalidError;
module.exports = NoTitleForModelError;