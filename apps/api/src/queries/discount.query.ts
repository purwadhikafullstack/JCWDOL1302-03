import { IDiscount } from '@/interfaces/discount.interface';
import prisma from '@/prisma';

export class DiscountQueries {
  public createDiscountQuery = async (data: IDiscount) => {
    try {
      await prisma.$transaction(async (prisma) => {
        try {
          const discount = await prisma.discount.create({
            data: {
              store_id: data.store_id,
              type: data.type,
              value: data.value,
              minPurchase: data.minPurchase,
              maxPurchase: data.maxPurchase,
              startDate: data.startDate,
              endDate: data.endDate,
            },
          });
          return discount;
        } catch (e) {
          throw e;
        }
      });
    } catch (e) {
      throw e;
    }
  };
}
