import { IPayment } from '@/interfaces/payment.interface';
import prisma from '@/prisma';

export class PaymentQueries {
  public createPaymentQuery = async (data: IPayment) => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const payment = await prisma.payment.create({
            data: {
              order_id: Number(data.order_id),
              method: '',
              status: 'UNPAID',
              proof: '',
            },
          });
          return payment;
        } catch (e) {
          throw e;
        }
      });
      return t;
    } catch (e) {
      throw e;
    }
  };

  public updatePaymentQuery = async (
    data: IPayment,
    id: number,
    proof: string,
  ) => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const payment = await prisma.payment.update({
            where: {
              id: Number(id),
            },
            data: {
              order_id: data.order_id,
              method: data.method,
              status: 'PAID',
              proof: proof,
            },
          });
          return payment;
        } catch (e) {
          throw e;
        }
      });
      return t;
    } catch (e) {
      throw e;
    }
  };
}
