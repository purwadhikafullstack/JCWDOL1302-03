import { Cart, CartItem } from '@prisma/client';
import { ICart, ICartItem } from '@/interfaces/cart.interface';
import { CartQueries } from '@/queries/cart.query';
import { httpException } from '@/exceptions/http.exception';
import { Container, Service } from 'typedi';

@Service()
export class CartActions {
  cartQuery = Container.get(CartQueries);

  public getCartByUserIDAction = async (id: number): Promise<Cart | null> => {
    try {
      const cart = await this.cartQuery.getCartByUserIDQuery(id);

      if (!cart) throw new httpException(404, 'Cart not found');

      return cart;
    } catch (e) {
      throw e;
    }
  };

  public updateCartAction = async (id: number, data: ICart): Promise<Cart> => {
    try {
      const cart = await this.cartQuery.updateCartQuery(id, data);
      return cart;
    } catch (e) {
      throw e;
    }
  };

  public createCartItemAction = async (
    data: ICartItem,
  ): Promise<CartItem | null> => {
    try {
      const existCartItem = await this.cartQuery.getCartItemByProductIDQuery(
        data.cart_id,
        data.product_id,
      );

      let cartItem;

      if (existCartItem) {
        cartItem = await this.cartQuery.updateCartItemQuery(
          existCartItem.id,
          data,
        );
      } else {
        cartItem = await this.cartQuery.createCartItemQuery(data);
      }

      return cartItem;
    } catch (err) {
      throw err;
    }
  };

  public deleteCartItemAction = async (id: number): Promise<CartItem> => {
    try {
      const cartItem = await this.cartQuery.deleteCartItemQuery(id);
      return cartItem;
    } catch (e) {
      throw e;
    }
  };

  public resetCartItemsAction = async (cart_id: number) => {
    try {
      await this.cartQuery.resetCartItemsQuery(cart_id);
    } catch (e) {
      throw e;
    }
  };
}
