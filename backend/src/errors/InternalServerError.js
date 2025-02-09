const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 500 Internal Server Error.
 * This error indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
 */
class InternalServerError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 500; // Internal Server Error
  }
}

module.exports = InternalServerError;
