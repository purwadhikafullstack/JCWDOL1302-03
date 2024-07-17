import { AuthControllers } from '@/controllers/auth.controller';
import { Container, Service } from 'typedi';
import { Router } from 'express';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';

@Service()
export class AuthRouter {
  authController = Container.get(AuthControllers);
  authGuard = Container.get(AuthMiddlewares);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      this.authGuard.verifyToken,
      this.authController.refreshTokenController,
    );
    this.router.post('/register', this.authController.registerController);
    this.router.post('/login', this.authController.loginController);
    this.router.post(
      '/verify',
      this.authGuard.verifyToken,
      this.authController.verifyController,
    );
    this.router.post(
      '/resetconfirmation',
      this.authController.resetConfirmationController,
    );
    this.router.post(
      '/resetconfirmation/updatepassword',
      this.authGuard.verifyToken,
      this.authController.updatePasswordController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
