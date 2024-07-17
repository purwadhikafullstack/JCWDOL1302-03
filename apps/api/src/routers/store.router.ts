import { Router } from 'express';
import { Container, Service } from 'typedi';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import { StoreControllers } from '@/controllers/store.controller';

@Service()
export class StoreRouter {
  storeController = Container.get(StoreControllers);
  authGuard = Container.get(AuthMiddlewares);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.storeController.getStoresController);
    this.router.get('/:id', this.storeController.getStoreByIDController);
    this.router.post(
      '/distance',
      this.authGuard.verifyToken,
      this.storeController.getDistanceStoresController,
    );
    this.router.post(
      '/',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.storeController.createStoreController,
    );
    this.router.patch(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.storeController.updateStoreController,
    );
    this.router.delete(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.storeController.deleteStoreController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
