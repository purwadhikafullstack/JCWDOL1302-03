import { FilterStore, IStore, ResultStore } from '@/interfaces/store.interface';
import { PrismaClient, Store } from '@prisma/client';

const prisma = new PrismaClient();

export class StoreQueries {
  public getStoresQuery = async (
    filters: FilterStore,
  ): Promise<ResultStore> => {
    try {
      const { name = '', page = 1, pageSize = 1000 } = filters;
      const skip = Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
      const take = Number(pageSize);

      const stores = await prisma.store.findMany({
        include: {
          admin: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        where: {
          name: {
            contains: name,
          },
        },
        skip,
        take,
      });

      const data = await prisma.store.aggregate({
        _count: {
          id: true,
        },
        where: {
          name: {
            contains: name,
          },
        },
      });
      const count = data._count.id;
      const pages = Math.ceil(count / pageSize);

      return { stores, pages };
    } catch (e) {
      throw e;
    }
  };

  public getStoreByIDQuery = async (id: number): Promise<Store | null> => {
    try {
      const store = await prisma.store.findUnique({
        where: {
          id: Number(id),
        },
      });
      return store;
    } catch (err) {
      throw err;
    }
  };

  public getStoreByNameQuery = async (name: string): Promise<Store | null> => {
    try {
      const store = await prisma.store.findFirst({
        where: {
          name: name,
        },
      });
      return store;
    } catch (e) {
      throw e;
    }
  };

  public createStoreQuery = async (storeData: IStore): Promise<Store> => {
    try {
      const createStore = await prisma.$transaction(
        async (prisma) => {
          try {
            const store = await prisma.store.create({
              data: {
                ...storeData,
              },
            });
            return store;
          } catch (e) {
            throw e;
          }
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
        },
      );
      return createStore;
    } catch (e) {
      throw e;
    }
  };

  public updateStoreQuery = async (
    id: number,
    storeData: IStore,
  ): Promise<Store> => {
    try {
      const updateStore = await prisma.store.update({
        data: {
          ...storeData,
        },
        where: {
          id,
        },
      });
      return updateStore;
    } catch (err) {
      throw err;
    }
  };
  public deleteStoreQuery = async (id: number): Promise<IStore> => {
    try {
      const deleteStore = await prisma.store.delete({
        where: { id },
      });
      return deleteStore;
    } catch (e) {
      throw e;
    }
  };
}
