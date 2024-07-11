import 'reflect-metadata';
import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { AuthRouter } from './routers/auth.router';
import { PaymentRouter } from './routers/payment.router';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { AddressRouter } from './routers/myAddress.router';
import { OrderRouter } from './routers/order.router';
import { StoreRouter } from './routers/store.router';
import { CategoriesRouter } from './routers/categories.router';
import { ProductRouter } from './routers/product.route';
import { AuthAdminRouter } from './routers/auth.admin.router';
import { UserRouter } from './routers/user.router';
import { DiscountRouter } from './routers/discount.router';
import { AdminRouter } from './routers/admin.router';
import { StockRouter } from './routers/stock.router';
import { ShippingRouter } from './routers/shipping.router';
import { CartRouter } from './routers/cart.router';
import { RoleRouter } from './routers/role.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/static', express.static('./src/public'));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );

    this.app.use(ErrorMiddleware);
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const authRouter = new AuthRouter();
    const addressRouter = new AddressRouter();
    const stockRouter = new StockRouter();
    const orderRouter = new OrderRouter();
    const categoriesRouter = new CategoriesRouter();
    const productRouter = new ProductRouter();
    const paymentRouter = new PaymentRouter();
    const storeRouter = new StoreRouter();
    const authAdminRouter = new AuthAdminRouter();
    const userRouter = new UserRouter();
    const discountRouter = new DiscountRouter();
    const adminRouter = new AdminRouter();
    const shippingRouter = new ShippingRouter();
    const cartRouter = new CartRouter();
    const roleRouter = new RoleRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/address', addressRouter.getRouter());
    this.app.use('/api/order', orderRouter.getRouter());
    this.app.use('/api/categories', categoriesRouter.getRouter());
    this.app.use('/api/product', productRouter.getRouter());
    this.app.use('/api/payment', paymentRouter.getRouter());
    this.app.use('/api/stores', storeRouter.getRouter());
    this.app.use('/api/auth/admin', authAdminRouter.getRouter());
    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/discount', discountRouter.getRouter());
    this.app.use('/api/admin', adminRouter.getRouter());
    this.app.use('/api/stock', stockRouter.getRouter());
    this.app.use('/api/shipping', shippingRouter.getRouter());
    this.app.use('/api/cart', cartRouter.getRouter());
    this.app.use('/api/role', roleRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
