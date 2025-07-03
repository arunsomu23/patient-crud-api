jest.mock('../utils/logger'); // This mocks the entire logger module

const logger = require('../utils/logger');

describe('Logger Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call logger.error with correct message', () => {
    const error = new Error('Test error');
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    // Use your actual error handler
    const errorHandler = require('../middlewares/errorHandler');
    errorHandler(error, mockReq, mockRes, next);

    expect(logger.error).toHaveBeenCalledWith('Test error', expect.objectContaining({
      stack: expect.any(String)
    }));
  });
});
