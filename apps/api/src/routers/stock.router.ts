import {
  createStockController,
  getStockByIDController,
  getStockController,
  updateStockController,
  deleteStockController,
} from '@/controllers/stock.controller';
import { Container, Service } from 'typedi';
import { Router } from 'express';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import express from 'express';
import { create } from 'handlebars';
import { uploader } from '@/helpers/multer';

@Service()
export class StockRouter {
  createStockController = Container.get(createStockController);
  getStockController = Container.get(getStockController);
  getStockByIDController = Container.get(getStockByIDController);
  updateStockController = Container.get(updateStockController);
  deleteStockController = Container.get(deleteStockController);
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
      this.createStockController.createStockController,
    );
    this.router.get('/', this.getStockController.getStockController);
    this.router.get('/:id', this.getStockByIDController.getStockByIDController);
    this.router.patch('/:id', this.updateStockController.updateStockController);
    this.router.delete(
      '/:id',
      this.deleteStockController.deleteStockController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
