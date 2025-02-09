const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 404 Not Found.
 * This error indicates that the requested resource could not be found on the server.
 */
class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 404; // Not Found
  }
}

module.exports = NotFoundError;