class ApiError extends Error {
  constructor(statusCode, message, isOprational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = this.isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
