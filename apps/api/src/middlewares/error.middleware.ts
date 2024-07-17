import { Request, Response, NextFunction } from 'express';
import { httpException } from '@/exceptions/http.exception';

export const ErrorMiddleware = (
  error: httpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Someting Wong!';
    res.status(status).json({ message });
  } catch (e) {
    next(e);
  }
};
