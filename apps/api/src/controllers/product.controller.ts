import { Container, Service } from 'typedi';
import {
  createProductAction,
  getProductsAction,
  getProductByIDAction,
  updateProductAction,
  deleteProductAction,
  getProductByAdminIDAction,
} from '@/actions/product.action';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Penyimpanan di folder 'uploads/'
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

// Middleware untuk mengunggah file dengan multer
const upload = multer({ storage: storage }).single('image');

@Service()

//CREATE Categories
export class createProductController {
  public createProductController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {file} = req
      const token = req.admin;
      const data = await createProductAction(req.body, String(file?.filename), token);

      res.status(200).json({
        message: 'Create Product Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//get Product
export class getProductsController {
  public getProductsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filters = req.query;
      const data = await getProductsAction(filters);

      res.status(200).json({
        message: 'Get Product Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export class getProductByIDController {
  public getProductByIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await getProductByIDAction(Number(id));

      res.status(200).json({
        message: 'Get Product By ID success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export class getProductByAdminIDController {
  public getProductsByAdminIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const data = await getProductByAdminIDAction(Number(id));
      res.status(200).json({
        message: 'Get Products By Admin ID Success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}

export class updateProductController {
  public updateProductController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const filters = req.body;
      const data = await updateProductAction(Number(id), filters);

      res.status(200).json({
        message: 'Update Product Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//DELETE CATEGORIES
export class deleteProductController {
  public deleteProductController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data = await deleteProductAction(Number(id));

      res.status(200).json({
        message: 'Delete Product Success Full',
        data,
      });
    } catch (err) {
      throw err;
    }
  };
}
