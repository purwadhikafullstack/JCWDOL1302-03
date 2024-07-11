import { Request, Response, NextFunction } from 'express';
import { RoleActions } from '@/actions/role.action';
import { Container } from 'typedi';

export class RoleControllers {
  roleAction = Container.get(RoleActions);

  public createRoleController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newRole = await this.roleAction.createRoleAction(req.body);

      res.status(200).json({
        message: 'Create role success',
        data: newRole,
      });
    } catch (e) {
      next(e);
    }
  };

  public getRolesController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filters = req.query;
      const data = await this.roleAction.getRolesAction(filters);

      res.status(200).json({
        message: 'Get Roles Success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public updateRoleController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const filters = req.body;
      const data = await this.roleAction.updateRoleAction(Number(id), filters);

      res.status(200).json({
        message: 'Update Role Success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public deleteRoleController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data = await this.roleAction.deleteRoleAction(Number(id));

      res.status(200).json({
        message: 'Delete role success',
        data,
      });
    } catch (e) {
      throw e;
    }
  };
}
