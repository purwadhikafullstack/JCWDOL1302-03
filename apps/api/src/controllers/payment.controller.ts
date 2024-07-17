import { Container, Service } from 'typedi';
import { PaymentActions } from '@/actions/payment.action';
import { NextFunction, Request, Response } from 'express';

@Service()
export class PaymentControllers {
  paymentAction = Container.get(PaymentActions);

  public createPaymentController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.paymentAction.createPaymentAction(req.body);

      res.status(200).json({
        message: 'Payment receipt created! pay in one hour before expired!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public updatePaymentController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { file } = req;
      const { id } = req.params;
      const data = await this.paymentAction.updatePaymentAction(
        req.body,
        Number(id),
        String(file?.filename),
      );

      res.status(200).json({
        message: 'Payment proof uploaded!',
        data,
      });
    } catch (e) {
      next(e);
    }
  };
}
