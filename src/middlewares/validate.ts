import httpStatus from 'http-status';
import ApiError from '../models/errors/api-error';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import { z } from 'zod';

const validate =
  (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validSchema = pick(schema.shape, ['params', 'query', 'body']);
      const obj = pick(req, Object.keys(validSchema));
      const value = schema.parse(obj);
      Object.assign(req, value);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(', ');
        console.log(error);
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      return next(error);
    }
  };

export default validate;
