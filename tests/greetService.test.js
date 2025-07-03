jest.mock('../utils/logger'); // Mock the logger module

const logger = require('../utils/logger');
const greet = require('../services/greetService');

describe('greet()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return greeting and log info message', () => {
    const result = greet('Arun');
    
    expect(result).toBe('Hello, Arun!');
    expect(logger.info).toHaveBeenCalledWith('Greeting sent: Hello, Arun!');
  });
});
