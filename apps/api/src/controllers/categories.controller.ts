import { Container, Service } from 'typedi';
import { createCategoriesAction,getCategoriesAction, updateCategoriesAction, deleteCategoriesAction } from '@/actions/categories.action';
import { Request, Response, NextFunction } from 'express';


@Service()
//CREATE Categories
export class createCategoriesController {
  public createCategoriesController = async (req: Request, res: Response, next: NextFunction,
  ) => {
    try {

      const token = req.user;
      const data = await createCategoriesAction(req.body);
     

      res.status(200).json({
        message: "Create Categories Success", data
    })
    } catch (err) {
      next(err);
    }
  };
}

export class getCategoriesController {
  public getCategoriesController = async (req: Request, res: Response, next: NextFunction,
  ):Promise<void> => {
    try {

     const filters = req.query
      const data = await getCategoriesAction (filters);
     

      res.status(200).json({
        message: "Get Categories Success", data
    })
    } catch (err) {
      next(err);
    }
  };
}

export class updateCategoriesController {
  public updateCategoriesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
     const {id} = req.params
     const filters = req.body

     const data = await updateCategoriesAction(Number(id), filters)
     

      res.status(200).json({
        message: "Update Category Success", data
    })
    } catch (err) {
      next(err);
    }
  };
}

//DELETE CATEGORIES
export class deleteCategoriesController {
  public deleteCategoriesController = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const {id} = req.params

      const data = await deleteCategoriesAction(Number(id))

      res.status(200).json({
        message: "Delete Address Success Full", data
      })
    } catch (err) {
      throw err
    }
  }
}