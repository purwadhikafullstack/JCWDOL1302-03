import { Router } from 'express';
import { Container, Service } from 'typedi';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import { AdminControllers } from '@/controllers/admin.controller';

@Service()
export class AdminRouter {
  adminController = Container.get(AdminControllers);
  authGuard = Container.get(AuthMiddlewares);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.adminController.getAllAdminController);
    this.router.get('/:id', this.adminController.getAdminByIDController);
    this.router.post(
      '/',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.adminController.createAdminController,
    );
    this.router.patch(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.adminController.updateAdminController,
    );
    this.router.delete(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.adminController.deleteAdminController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
