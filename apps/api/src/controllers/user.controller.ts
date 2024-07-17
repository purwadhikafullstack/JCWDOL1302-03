import { UserActions } from '@/actions/user.action';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';

@Service()
export class UserController {
  userActions = Container.get(UserActions);

  public updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const { file } = req;
      const data = req.body;
      const user = await this.userActions.updateUserAction(
        id,
        data,
        String(file?.filename),
      );
      res.status(200).json({
        message: 'Update user profile success',
        data: user,
      });
    } catch (e) {
      next(e);
    }
  };

  public getAllUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filters = req.query;

      const data = await this.userActions.getAllUserAction(filters);

      res.status(200).json({
        message: 'Get All User Data Success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public getAllEmailUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const verified =
      req.query.verified === 'true'
        ? true
        : req.query.verified === 'false'
          ? false
          : undefined;

    try {
      const emails = await this.userActions.getAllEmailUserAction(verified);

      res.status(200).json({
        message: 'Get All Email User Data Success',
        emails,
      });
    } catch (e) {
      next(e);
    }
  };
}
