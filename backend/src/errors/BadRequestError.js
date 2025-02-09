const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 400 Bad Request.
 * This error indicates that the server cannot process the request due to a client error.
 */
class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 400; // Bad Request
  }
}

module.exports = BadRequestError;