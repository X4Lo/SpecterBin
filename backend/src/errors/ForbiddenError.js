const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 403 Forbidden.
 * This error indicates that the client does not have permission to access the requested resource.
 */
class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 403; // Forbidden
  }
}

module.exports = ForbiddenError;
