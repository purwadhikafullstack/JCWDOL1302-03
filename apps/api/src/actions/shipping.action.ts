import { RAJAONGKIRKEY, RAJAONGKIRURL } from '@/config';
import { Service } from 'typedi';

@Service()
export class ShippingAction {
  public getProvincesAction = async () => {
    try {
      const response = await fetch(`${RAJAONGKIRURL}/province`, {
        headers: {
          key: RAJAONGKIRKEY as string,
        },
      });
      const data = await response.json();
      const provinces = data?.rajaongkir?.results || [];
      return provinces;
    } catch (e) {
      throw e;
    }
  };

  public getCitiesAction = async (provinceID: string) => {
    if (!provinceID) return [];
    try {
      const response = await fetch(
        `${RAJAONGKIRURL}/city?province=${provinceID}`,
        {
          headers: {
            key: RAJAONGKIRKEY as string,
          },
        },
      );

      const data = await response.json();
      const cities = data?.rajaongkir?.results || [];
      return cities;
    } catch (e) {
      throw e;
    }
  };

  public getCouriersAction = async (origin: string, destination: string) => {
    try {
      const weightgram: number = 1000;
      const courierslist: string = 'jne:pos:tiki';
      const body = {
        origin: origin,
        destination: destination,
        weight: weightgram,
        courier: courierslist,
      };

      const response = await fetch(`${RAJAONGKIRURL}/cost`, {
        method: 'POST',
        headers: {
          key: RAJAONGKIRKEY as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      const couriers = data?.rajaongkir?.results || [];
      return couriers;
    } catch (e) {
      throw e;
    }
  };
}
