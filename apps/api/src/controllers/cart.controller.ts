import { Request, Response, NextFunction } from 'express';
import { CartActions } from '@/actions/cart.action';
import { Container } from 'typedi';

export class CartController {
  cartAction = Container.get(CartActions);

  public getCartByUserIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.cartAction.getCartByUserIDAction(Number(id));

      res.status(200).json({
        message: 'Get cart success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  public updateCartController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.cartAction.updateCartAction(Number(id), req.body);

      res.status(200).json({
        message: 'Update cart success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public createCartItemController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const params = req.body;
      const data = await this.cartAction.createCartItemAction({
        ...params,
        quantity: Number(params.quantity),
      });

      res.status(200).json({
        message: 'Create cart item success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public deleteCartitemController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.cartAction.deleteCartItemAction(Number(id));

      res.status(200).json({
        message: 'Delete cart item success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public resetCartItemController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { cart_id } = req.params;
      await this.cartAction.resetCartItemsAction(Number(cart_id));

      res.status(200).json({
        message: 'Reset cart item success',
      });
    } catch (e) {
      next(e);
    }
  };
}
