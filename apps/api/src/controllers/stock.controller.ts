import { Container, Service } from 'typedi';
import { createStockAction, getStockAction, getStockByIDAction, updateStockAction, deleteStockAction } from '@/actions/stock.action';
import { Request, Response, NextFunction } from 'express';
// import multer from 'multer';
// import path from 'path';



@Service()

//CREATE stock
export class createStockController {
  public createStockController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.admin;
      const data = await createStockAction(req.body, token);

      res.status(200).json({
        message: 'Create Stock Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//get Product
export class getStockController {
  public getStockController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.admin
      const filters = req.query;
      const data = await getStockAction(filters);

      res.status(200).json({
        message: 'Get Stock Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export class getStockByIDController {
  public getStockByIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await getStockByIDAction(Number(id));

      res.status(200).json({
        message: 'Get Stock By ID success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export class updateStockController {
  public updateStockController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const filters = req.body;
     const data = await updateStockAction(Number(id), filters, )
    

      res.status(200).json({
        message: 'Update Stock Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//DELETE CATEGORIES
export class deleteStockController {
  public deleteStockController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data = await deleteStockAction(Number(id));

      res.status(200).json({
        message: 'Delete Stock Success Full',
        data,
      });
    } catch (err) {
      throw err;
    }
  };
}



