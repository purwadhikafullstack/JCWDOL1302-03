import { IDiscount } from '@/interfaces/discount.interface';
import { DiscountQueries } from '@/queries/discount.query';
import { Container, Service } from 'typedi';

@Service()
export class DiscountActions {
  discountQuery = Container.get(DiscountQueries);

  public createDiscountAction = async (data: IDiscount) => {
    try {
      if (data.minPurchase !== undefined && data.maxPurchase !== undefined) {
        if (data.minPurchase > data.maxPurchase) {
          throw new Error('Min purchase cannot be greater than max purchase');
        }
      }

      if (!data.type || !['percentage', 'nominal'].includes(data.type)) {
        throw new Error(
          'Invalid discount type. Only "percentage" or "nominal" is allowed.',
        );
      }

      if (
        data.type === 'percentage' &&
        (Number(data.value) < 0 || Number(data.value) > 100)
      ) {
        throw new Error(
          'Invalid discount value for percentage type. Value must be between 0 and 100.',
        );
      }

      if (data.type === 'nominal' && Number(data.value) < 0) {
        throw new Error(
          'Invalid discount value for nominal type. Value must be greater than or equal to 0.',
        );
      }

      const discount = await this.discountQuery.createDiscountQuery(
        data,
      );
      return discount;
    } catch (e) {
      throw e;
    }
  };
}
