import { IPayment } from '@/interfaces/payment.interface';
import { PaymentQueries } from '@/queries/payment.query';
import { Container, Service } from 'typedi';

@Service()
export class PaymentActions {
  paymentQuery = Container.get(PaymentQueries);

  public createPaymentAction = async (data: IPayment) => {
    try {
      const payment = await this.paymentQuery.createPaymentQuery(data);
      return payment;
    } catch (e) {
      throw e;
    }
  };

  public updatePaymentAction = async (
    data: IPayment,
    id: number,
    proof: string,
  ) => {
    try {
      const payment = await this.paymentQuery.updatePaymentQuery(
        data,
        id,
        proof,
      );
      return payment;
    } catch (e) {
      throw e;
    }
  };
}
