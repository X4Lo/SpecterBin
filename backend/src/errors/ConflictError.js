const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 409 Conflict.
 * This error indicates that the request could not be processed due to a conflict with the current state of the resource.
 */
class ConflictError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 409; // Conflict
  }
}

module.exports = ConflictError;
