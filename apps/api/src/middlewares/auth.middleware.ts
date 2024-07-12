import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { API_KEY } from '@/config';
import { Admin, User } from '@/types';

export class AuthMiddlewares {
  public verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      console.log(token);
      if (!token) throw new Error('Token invalid!');

      const verifyUser = verify(token, String(API_KEY));
      if (!verifyUser) throw new Error('Unauthorized!');

      const verifyAdmin = verify(token, String(API_KEY));
      if (!verifyAdmin) throw new Error('Unauthorized!');

      req.user = verifyUser as User;
      req.admin = verifyAdmin as Admin;

      next();
    } catch (err) {
      next(err);
    }
  };

  async adminGuard(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        String(req.admin.role_id) !== '1' ||
        String(req.admin.role_id) !== '2'
      )
        throw new Error('Unauthorized!');
      next();
    } catch (err) {
      next(err);
    }
  }

  async superAdminGuard(req: Request, res: Response, next: NextFunction) {
    try {
      if (String(req.admin.role_id) !== '1') throw new Error('Unauthorized!');
      next();
    } catch (e) {
      next(e);
    }
  }
}
