import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";

const errorConverter = (err, req, res, next) => {
  let error = err;
  console.log(error.message, "errorerrorerrorerror");
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message =
      error.message || error instanceof mongoose.Error
        ? "Bad Request"
        : "Internal server errror";
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.locals.errrorMessage = err.message;
  const resposne = {
    code: statusCode,
    message,
  };
  res.status(statusCode).send(resposne);
};

export { errorConverter, errorHandler };
