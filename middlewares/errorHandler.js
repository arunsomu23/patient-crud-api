const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message}`, { stack: err.stack });
  res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = errorHandler;