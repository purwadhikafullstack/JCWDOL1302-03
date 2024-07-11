import { Request, Response, NextFunction } from 'express';
import { StoreActions } from '@/actions/store.action';
import { Container } from 'typedi';

export class StoreControllers {
  storeAction = Container.get(StoreActions);

  public getStoresController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filters = req.query;

      const data = await this.storeAction.getStoresAction(filters);

      res.status(200).json({
        message: 'Get stores success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public getStoreByIDController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.storeAction.getStoreByIDAction(Number(id));

      res.status(200).json({
        message: 'Get store success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public getDistanceStoresController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.storeAction.getDistanceStoresAction(req.body);
      res.status(200).json({
        message: 'Get distance stores success',
        data,
      });
    } catch (e) {
      next(e);
    }
  };

  public createStoreController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newStore = await this.storeAction.createStoreAction(req.body);

      res.status(200).json({
        message: 'Create store success',
        data: newStore,
      });
    } catch (e) {
      next(e);
    }
  };

  public updateStoreController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const params = req.body;

      const data = await this.storeAction.updateStoreAction(Number(id), params);

      res.status(200).json({
        message: 'Update store success',
        data,
      });
    } catch (err) {
      throw err;
    }
  };

  public deleteStoreController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data = await this.storeAction.deleteStoreAction(Number(id));

      res.status(200).json({
        message: 'Delete store success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
