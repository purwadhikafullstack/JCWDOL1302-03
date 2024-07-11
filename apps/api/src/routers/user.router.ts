import { UserController } from '@/controllers/user.controller';
import { uploader } from '@/helpers/multer';
import { Router } from 'express';
import { Service, Container } from 'typedi';

@Service()
export class UserRouter {
  userController = Container.get(UserController);

  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch(
      '/update/:id',
      uploader(`PROFILEPICTURE-`, '/profilePicture').single('profilePicture'),
      this.userController.updateUserController,
    );
    this.router.get('/', this.userController.getAllUserController);
    this.router.get('/email', this.userController.getAllEmailUserController);
  }

  getRouter(): Router {
    return this.router;
  }
}
