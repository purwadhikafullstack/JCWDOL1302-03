import { AdminActions } from '@/actions/admin.action';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class AdminControllers {
  adminAction = Container.get(AdminActions);

  public getAdminByIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const data = await this.adminAction.getAdminByIDAction(Number(id));

      res.status(200).json({
        message: 'Get admin data success!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public getAllAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filter = req.query;
      const data = await this.adminAction.getAllAdminAction(filter);

      res.status(200).json({
        message: 'Get All Admin Success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public createAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newAdmin = await this.adminAction.createAdminAction(req.body);

      res.status(200).json({
        message: 'Create admin success',
        data: newAdmin,
      });
    } catch (e) {
      next(e);
    }
  };

  public updateAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const params = req.body;

      const data = await this.adminAction.updateAdminAction(Number(id), params);

      res.status(200).json({
        message: 'Update admin success',
        data,
      });
    } catch (e) {
      throw e;
    }
  };

  public deleteAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data = await this.adminAction.deleteAdminAction(Number(id));

      res.status(200).json({
        message: 'Delete admin success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}
