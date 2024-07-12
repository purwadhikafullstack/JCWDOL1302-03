import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

export class RajaOngkirProvinceRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private routes(): void {
    this.router.get('/provinces', async (req: Request, res: Response) => {
      const apiKey = process.env.RAJAONGKIR_API_KEY;
      if (!apiKey) {
        return res
          .status(500)
          .json({ error: 'RAJAONGKIR_API_KEY is not defined' });
      }

      try {
        const response = await fetch(
          'https://api.rajaongkir.com/starter/province',
          {
            method: 'GET',
            headers: {
              key: apiKey,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
    });
  }
}
