import { Router } from 'express';
import { Container, Service } from 'typedi';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import { RoleControllers } from '@/controllers/role.controller';

@Service()
export class RoleRouter {
  roleController = Container.get(RoleControllers);
  authGuard = Container.get(AuthMiddlewares);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      '/',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.roleController.createRoleController,
    );
    this.router.get('/', this.roleController.getRolesController);
    this.router.patch(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.roleController.updateRoleController,
    );
    this.router.delete(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.roleController.deleteRoleController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
