/**
 * Base class for custom HTTP errors.
 * Extend this class to create specific error types with custom properties and behavior.
 */
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  statusCode() {
    return 500; // Default to 500 Internal Server Error
  }
}

module.exports = CustomError;