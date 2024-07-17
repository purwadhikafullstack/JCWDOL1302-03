import { Router } from 'express';
import { Container, Service } from 'typedi';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import { CartController } from '@/controllers/cart.controller';

@Service()
export class CartRouter {
  cartController = Container.get(CartController);
  authGuard = Container.get(AuthMiddlewares);
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/item',
      this.authGuard.verifyToken,
      this.cartController.createCartItemController,
    );
    this.router.get(
      '/user/:id',
      this.authGuard.verifyToken,
      this.cartController.getCartByUserIDController,
    );
    this.router.patch(
      '/:id',
      this.authGuard.verifyToken,
      this.cartController.updateCartController,
    );
    this.router.delete(
      '/item/:id',
      this.authGuard.verifyToken,
      this.cartController.deleteCartitemController,
    );
    this.router.delete(
      '/items/:cart_id',
      this.authGuard.verifyToken,
      this.cartController.resetCartItemController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
