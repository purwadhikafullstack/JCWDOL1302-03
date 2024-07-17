import { DiscountActions } from '@/actions/discount.action';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';

@Service()
export class DiscountControllers {
  discountAction = Container.get(DiscountActions);

  public createDiscountController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.discountAction.createDiscountAction(
        req.body,
      );
      res.status(200).json({
        message: 'Discount created!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}
