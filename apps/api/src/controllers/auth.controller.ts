import { AuthActions } from '@/actions/auth.action';
import { Container, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';

@Service()
export class AuthControllers {
  authAction = Container.get(AuthActions);

  public registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newUser = await this.authAction.registerAction(req.body);
      res.status(200).json({
        message: 'Register Success, please check email for verification',
        data: newUser,
      });
    } catch (e) {
      next(e);
    }
  };

  public resetConfirmationController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const emailRequested = await this.authAction.resetConfirmationAction(
        req.body,
      );
      res.status(200).json({
        message: 'Check your email for confirming reset password',
        data: emailRequested,
      });
    } catch (e) {
      next(e);
    }
  };

  public updatePasswordController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newPassword = req.body.password;
      const data = this.authAction.updatePasswordAction({
        ...req.user,
        password: newPassword,
      });
      res.status(200).json({
        message: 'Password updated successfully',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.authAction.loginAction(req.body);
      res.status(200).json({
        message: 'Login success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public verifyController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        id,
        verified,
        referralCode,
        role,
        profilePicture,
        email,
        username,
        name,
        gender,
        birthDate,
        claimedCode,
        longitude,
        latitude
      } = req.user;
      const password = req.body.password;
      const data = await this.authAction.verifyAction({
        email,
        username,
        password,
        name,
        gender,
        birthDate,
        claimedCode,
        id,
        verified,
        referralCode,
        role,
        profilePicture,
        longitude,
        latitude,
      });
      res.status(200).json({
        message: `Email verified, welcome`,
        data: data,
      });
    } catch (e) {
      next(e);
    }
  };

  public refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.user;
      const data = await this.authAction.refreshTokenAction(email);
      res.status(200).json({
        message: 'Refresh token success',
        data: data,
      });
    } catch (e) {
      next(e);
    }
  };
}
