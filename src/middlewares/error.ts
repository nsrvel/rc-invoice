import type { Express, ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../utils/logger';
import ApiError from '../models/errors/api-error';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack })
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export function error404(app: Express, dir: string) {
  app.use((req, res, next) => {
    const isNotFound = req.statusCode && req.statusCode == 404;
    const isApi = req.originalUrl.includes('/api');

    if (isNotFound) {
      if (isApi) {
        next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
      } else {
        res.sendFile(dir);
      }
    }

    next();
  });
}
