import { AuthActions } from '@/actions/auth.action';
import { Container, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { AuthAdminActions } from '@/actions/auth.admin.action';

@Service()
export class AuthAdminControllers {
  authAdminAction = Container.get(AuthAdminActions);

  public loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.authAdminAction.adminLoginAction(req.body);
      res.status(200).json({
        message: `Admin Login success, Welcome ${data.admin.username} You logged in as ${data.admin.role_id === 1 ? 'Super Admin' : 'Store Admin'} `,
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public refreshAdminTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const email = req.admin.email as string;

      const result = await this.authAdminAction.refreshAdminTokenAction(email);

      res.status(200).json({
        message: 'Refresh token success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
