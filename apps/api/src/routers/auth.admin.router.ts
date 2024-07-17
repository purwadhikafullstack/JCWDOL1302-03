import { AuthControllers } from '@/controllers/auth.controller';
import { Container, Service } from 'typedi';
import { Router } from 'express';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import { AuthAdminControllers } from '@/controllers/auth.admin.controller';

@Service()
export class AuthAdminRouter {
  authAdminController = Container.get(AuthAdminControllers);
  authGuard = Container.get(AuthMiddlewares);
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/login', this.authAdminController.loginController);
    this.router.get(
      '/',
      this.authGuard.verifyToken,
      this.authAdminController.refreshAdminTokenController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
