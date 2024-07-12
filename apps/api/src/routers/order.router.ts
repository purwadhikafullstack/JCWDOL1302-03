import {
  orderController,
  getOrderController,
  getOrderByIDController,
} from '@/controllers/order.controller';
import { Container, Service } from 'typedi';
import { Router } from 'express';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import express from 'express';
import { create } from 'handlebars';

@Service()
export class OrderRouter {
  orderController = Container.get(orderController);
  getOrderController = Container.get(getOrderController);
  getOrderByIDController = Container.get(getOrderByIDController);
  authGuard = Container.get(AuthMiddlewares);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.orderController.orderController);
    this.router.get(
      '/',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.getOrderController.getOrderController,
    );
    this.router.get(
      '/:id',
      this.authGuard.verifyToken,
      this.authGuard.superAdminGuard,
      this.getOrderByIDController.getOrderByIDController,
    );
    this.router.get(
      '/:id/orders',
      this.orderController.getOrdersByUserController,
    );
    this.router.post(
      '/confirm/:id',
      this.orderController.confirmOrderByUserController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
