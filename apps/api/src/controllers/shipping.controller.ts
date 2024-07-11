import { ShippingAction } from '@/actions/shipping.action';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';

@Service()
export class ShippingController {
  shippingAction = Container.get(ShippingAction);

  public getProvincesController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.shippingAction.getProvincesAction();
      res.status(200).json({
        message: 'Get Provinces data success!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public getCitiesController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const provinceID = req.query.provinceID;
      const data = await this.shippingAction.getCitiesAction(
        provinceID as string,
      );
      res.status(200).json({
        message: 'Get cities data success!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public getCouriersController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { origin, destination } = req.query;
      const data = await this.shippingAction.getCouriersAction(
        origin as string,
        destination as string,
      );
      res.status(200).json({
        message: 'Get couriers data success!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}
