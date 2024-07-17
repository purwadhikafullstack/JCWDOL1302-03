import { Container, Service } from 'typedi';
import { Store } from '@prisma/client';
import { StoreQueries } from '@/queries/store.query';
import {
  FilterStore,
  IStore,
  IUserLocation,
  ResultStore,
} from '@/interfaces/store.interface';
import { httpException } from '@/exceptions/http.exception';
import haversine from 'haversine';

@Service()
export class StoreActions {
  storeQuery = Container.get(StoreQueries);

  public getStoresAction = async (
    filters: FilterStore,
  ): Promise<ResultStore> => {
    try {
      const data = await this.storeQuery.getStoresQuery(filters);
      return data;
    } catch (e) {
      throw e;
    }
  };

  public getStoreByIDAction = async (id: number): Promise<Store | null> => {
    try {
      const store = await this.storeQuery.getStoreByIDQuery(id);

      if (!store) throw new httpException(404, 'Data not found!');

      return store;
    } catch (e) {
      throw e;
    }
  };

  public getDistanceStoresAction = async (userLocation: IUserLocation) => {
    try {
      const { stores } = await this.storeQuery.getStoresQuery({});
      const maxDistance = 30;
      const distanceStores = stores.map((store) => {
        const distance =
          userLocation.longitude &&
          userLocation.latitude &&
          store.longitude &&
          store.latitude
            ? haversine(
                {
                  longitude: userLocation.longitude,
                  latitude: userLocation.latitude,
                },
                { longitude: store.longitude, latitude: store.latitude },
              )
            : null;
        return { ...store, distance };
      });

      return distanceStores.sort(
        (a, b) => (a.distance as number) - (b.distance as number),
      );
    } catch (e) {
      throw e;
    }
  };

  public createStoreAction = async (storeData: IStore): Promise<Store> => {
    try {
      const existStore = await this.storeQuery.getStoreByNameQuery(
        storeData.name,
      );

      if (existStore) throw new Error('Store name already exists');

      const newStore = await this.storeQuery.createStoreQuery(storeData);

      return newStore;
    } catch (err) {
      throw err;
    }
  };

  public updateStoreAction = async (
    id: number,
    storeData: IStore,
  ): Promise<Store> => {
    try {
      const store = await this.storeQuery.updateStoreQuery(id, storeData);
      return store;
    } catch (e) {
      throw e;
    }
  };

  public deleteStoreAction = async (id: number): Promise<IStore> => {
    try {
      const store = await this.storeQuery.deleteStoreQuery(id);
      return store;
    } catch (e) {
      throw e;
    }
  };
}
