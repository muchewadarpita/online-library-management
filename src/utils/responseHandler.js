class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message
  };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

const handleError = (res, error, statusCode = null) => {
  const response = {
    success: false,
    error: error.message || 'Internal Server Error'
  };
  return res.status(statusCode || error.statusCode || 500).json(response);
};

module.exports = {
  AppError,
  handleResponse,
  handleError
};