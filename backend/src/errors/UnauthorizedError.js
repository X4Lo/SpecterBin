const CustomError = require('./CustomError');

/**
 * Represents an error for HTTP 401 Unauthorized.
 * This error indicates that the request requires user authentication.
 */
class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
  }

  statusCode() {
    return 401; // Unauthorized
  }
}

module.exports = UnauthorizedError;