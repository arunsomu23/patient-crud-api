const logger = require('../utils/logger');

function greet(name) {
  const message = `Hello, ${name}!`;
  logger.info(`Greeting sent: ${message}`);
  return message;
}

module.exports = greet;
