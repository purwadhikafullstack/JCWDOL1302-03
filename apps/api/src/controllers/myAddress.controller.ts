// import { AuthActions } from '@/actions/auth.action';
import { Container, Service } from 'typedi';
import {
  createMyAddressAction,
  getMyAddressAction,
  updateMyAddressAction,
  getStatusMyAddressAction,
  deleteMyAddressAction,
} from '@/actions/myAddress.action';
import { Request, Response, NextFunction } from 'express';

@Service()
//CREATE ADDRESS
export class createMyAddressController {
  public myAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.user;
      const data = await createMyAddressAction(req.body, token);

      res.status(200).json({
        message: 'Create Address Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//GET ADDRESS BY ID
export class getMyAddressController {
  public getMyAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.user;
      const data = await getMyAddressAction(token);

      res.status(200).json({
        message: 'Get ID Address Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//UPDATE ADDRESS BY ID
export class updateMyAddressController {
  public updateMyAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const filters = req.body;

      const data = await updateMyAddressAction(Number(id), filters);

      res.status(200).json({
        message: 'Update Address Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//UPDATE STATUS ADDRESS BY ID
export class updateStatusMyAddressController {
  public updateStatusMyAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const filters = req.body;
      const token = req.user;

      console.log(token);

      const curent = await getStatusMyAddressAction(token);
      const reset = await updateMyAddressAction(Number(curent[0].id), {
        isPrimary: false,
      });

      const data = await updateMyAddressAction(Number(id), filters);

      res.status(200).json({
        message: 'Update Address Success',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

//DELETE ADDRESS
export class deleteMyAddressController {
  public deleteMyAddressController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data = await deleteMyAddressAction(Number(id));

      res.status(200).json({
        message: 'Delete Address Success Full',
        data,
      });
    } catch (err) {
      throw err;
    }
  };
}

// const createMyAddressController = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await createMyAddressAction(req.body)
//   } catch (err) {
//     next (err)

//   }
// }

// export {
//   createMyAddressController
// }
