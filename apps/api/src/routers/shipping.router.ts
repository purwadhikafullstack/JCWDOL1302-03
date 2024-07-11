import { ShippingController } from '@/controllers/shipping.controller';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
export class ShippingRouter {
  private router: Router;
  
  shippingControllers = Container.get(ShippingController)
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/provinces', this.shippingControllers.getProvincesController)
    this.router.get('/cities', this.shippingControllers.getCitiesController)
    this.router.post('/couriers', this.shippingControllers.getCouriersController)
  }

  getRouter(): Router {
    return this.router;
  }
}
