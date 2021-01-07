import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // Default error message
  error.message = err.message;

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field';
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    sucess: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
