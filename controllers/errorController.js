const AppError = require('../utils/appError');

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: error.message,
    stack: err.stack,
  });
};

const sendErrProd = (err, res) => {
  // Operational, trusted error: send message to client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: error.message,
    });
    // Programming or other unknown error: do not leak error details.
  } else {
    // Log error.
    console.log('ERROR', err);

    // Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDb(error);

    sendErrProd(error, res);
  }
};
