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

@Service()
export class createProductController {
  public createProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
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

export class getProductsController {
  public getProductsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  public getProductByIDController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  public getProductsByAdminIDController = async (req: Request, res: Response, next: NextFunction) => {
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
  public updateProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const filters = req.body;
      const { file } = req;

      if (file) {
        filters.image = file.filename;
      }

      // Convert stock to number if it exists
      if (filters.stock) {
        filters.stock = Number(filters.stock);
      }

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


export class deleteProductController {
  public deleteProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await deleteProductAction(Number(id));

      res.status(200).json({
        message: 'Delete Product Success',
        data,
      });
    } catch (err) {
      throw err;
    }
  };
}
