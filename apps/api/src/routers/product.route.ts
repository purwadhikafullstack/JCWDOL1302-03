import {
  createProductController,
  getProductsController,
  getProductByIDController,
  updateProductController,
  deleteProductController,
  getProductByAdminIDController,
} from '@/controllers/product.controller';
import { Container, Service } from 'typedi';
import { Router } from 'express';
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import { uploader } from '@/helpers/multer';

@Service()
export class ProductRouter {
  createProductController = Container.get(createProductController);
  getProductsController = Container.get(getProductsController);
  getProductByIDController = Container.get(getProductByIDController);
  getProductsByAdminIDController = Container.get(getProductByAdminIDController);
  updateProductController = Container.get(updateProductController);
  deleteProductController = Container.get(deleteProductController);
  authGuard = Container.get(AuthMiddlewares);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", this.authGuard.verifyToken, uploader('IMG', "/product").single("image"), this.createProductController.createProductController);
    this.router.get('/', this.getProductsController.getProductsController);
    this.router.get('/:id', this.getProductByIDController.getProductByIDController);
    this.router.patch('/:id', uploader('IMG', '/product').single('image'), this.updateProductController.updateProductController);
    this.router.delete('/:id', this.deleteProductController.deleteProductController);
    this.router.get('/admin/:id/all', this.getProductsByAdminIDController.getProductsByAdminIDController);
  }

  getRouter(): Router {
    return this.router;
  }
}
