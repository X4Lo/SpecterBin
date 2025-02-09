const CustomError = require('../errors/CustomError');

module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode()).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
};