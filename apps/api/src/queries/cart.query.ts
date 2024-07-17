import { PrismaClient, Cart, CartItem } from '@prisma/client';
import { ICart, IUpdateCart, ICartItem } from '@/interfaces/cart.interface';

const prisma = new PrismaClient();

export class CartQueries {
  // Bagian Cart
  public getCartByUserIDQuery = async (
    user_id: number,
  ): Promise<Cart | null> => {
    try {
      const cart = await prisma.cart.findFirst({
        include: {
          cartItems: true,
        },
        where: {
          user: {
            id: user_id,
          },
        },
      });
      return cart;
    } catch (e) {
      throw e;
    }
  };

  public getCartByIDQuery = async (id: number): Promise<Cart | null> => {
    try {
      const cart = await prisma.cart.findUnique({
        include: {
          cartItems: true,
        },
        where: {
          id,
        },
      });
      return cart;
    } catch (e) {
      throw e;
    }
  };

  public createCartQuery = async (data: ICart): Promise<Cart> => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const cart = await prisma.cart.create({
            data: {
              ...data,
            },
          });

          return cart;
        } catch (err) {
          throw err;
        }
      });

      return t;
    } catch (err) {
      throw err;
    }
  };

  public updateCartQuery = async (
    id: number,
    data: IUpdateCart,
  ): Promise<Cart> => {
    try {
      const cart = await prisma.cart.update({
        data: {
          ...data,
        },
        where: {
          id,
        },
      });
      return cart;
    } catch (e) {
      throw e;
    }
  };

  public deleteCartQuery = async (id: number): Promise<Cart> => {
    try {
      const cart = await prisma.cart.delete({
        where: {
          id,
        },
      });

      return cart;
    } catch (e) {
      throw e;
    }
  };

  // Bagian Cart Item
  public getCartItemByProductIDQuery = async (
    cart_id: number,
    product_id: number,
  ): Promise<CartItem | null> => {
    try {
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          AND: {
            cart: {
              id: Number(cart_id),
            },
            product: {
              id: Number(product_id),
            },
          },
        },
      });
      return cartItem;
    } catch (e) {
      throw e;
    }
  };

  public createCartItemQuery = async (data: ICartItem): Promise<CartItem> => {
    try {
      const cartItem = await prisma.cartItem.create({
        data: {
          ...data,
        },
      });

      await this.updateCartTotalAmountQuery(Number(data.cart_id));

      return cartItem;
    } catch (e) {
      throw e;
    }
  };

  public updateCartItemQuery = async (
    id: number,
    data: ICartItem,
  ): Promise<CartItem> => {
    try {
      const cartItem = await prisma.cartItem.update({
        data: {
          ...data,
        },
        where: {
          id,
        },
      });

      await this.updateCartTotalAmountQuery(Number(data.cart_id));

      return cartItem;
    } catch (err) {
      throw err;
    }
  };

  public deleteCartItemQuery = async (id: number): Promise<CartItem> => {
    try {
      const cartItem = await prisma.cartItem.delete({
        where: {
          id,
        },
      });
      await this.updateCartTotalAmountQuery(Number(cartItem.cart_id));

      return cartItem;
    } catch (e) {
      throw e;
    }
  };

  public updateCartTotalAmountQuery = async (
    id: number,
  ): Promise<Cart | null> => {
    try {
      const cart = await prisma.cart.findUnique({
        include: {
          cartItems: true,
        },
        where: {
          id,
        },
      });

      const totalAmount =
        cart?.cartItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        ) || 0;

      await this.updateCartQuery(id, { totalAmount });

      return cart;
    } catch (err) {
      throw err;
    }
  };

  public resetCartItemsQuery = async (cart_id: number) => {
    try {
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            id: cart_id,
          },
        },
      });

      await this.updateCartTotalAmountQuery(Number(cart_id));
    } catch (e) {
      throw e;
    }
  };
}
