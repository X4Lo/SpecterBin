const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 422 Unprocessable Entity.
 * This error indicates that the server understands the request but cannot process it due to semantic validation errors.
 */
class ValidationError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 400; // Bad Request
  }
}

module.exports = ValidationError;