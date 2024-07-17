import { PaymentControllers } from '@/controllers/payment.controller';
import { uploader } from '@/helpers/multer';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
export class PaymentRouter {
  paymentController = Container.get(PaymentControllers);
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', this.paymentController.createPaymentController);
    this.router.patch(
      '/update/:id',
      uploader('PAYMENT-', '/payments').single('proof'),
      this.paymentController.updatePaymentController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
