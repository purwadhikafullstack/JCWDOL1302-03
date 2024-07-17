
import { createOrderAction, confirmOrderByUserAction, getOrdersByUserAction, getOrderAction, getOrderByIDAction } from '@/actions/order.action';


import { Container, Service } from 'typedi';

import { Request, Response, NextFunction } from 'express';

export class orderController {
  public getOrdersByUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userID = req.params.id;
      const data = await getOrdersByUserAction(Number(userID));
      res.status(200).json({ message: 'Get Orders Success!', data });
    } catch (e) {
      next(e);
    }
  };

  public orderController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await createOrderAction(req.body);

      res.status(200).json({
        message: 'Create Order Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  public confirmOrderByUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const data = await confirmOrderByUserAction(Number(id));
      res.status(200).json({
        message: 'Order Confirmed by User',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}


//get Order
export class getOrderController {
  public getOrderController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filters = req.query;
      const data = await getOrderAction(filters);

      res.status(200).json({
        message: 'Get Order Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  public confirmOrderByUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const data = await confirmOrderByUserAction(Number(id));
      res.status(200).json({
        message: 'Order Confirmed by User',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}


export class getOrderByIDController {
  public getOrderByIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await getOrderByIDAction(Number(id));

      res.status(200).json({
        message: 'Get ORDER By ID success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}



