import { FilterStore, IUserLocation } from '@/interfaces/store.interface';
import instance from '@/utils/instances';

export const getStores = async ({
  name = '',
  page = 1,
  pageSize = 10,
}: FilterStore) => {
  try {
    const { data } = await instance.get(
      `/stores?name=${name}&page=${page}&pageSize=${pageSize}`,
    );
    const stores = data.data;

    return stores;
  } catch (err) {
    console.error(err);
  }
};

export const getStoreByID = async (id: number) => {
  try {
    const { data } = await instance.get(`/stores/${id}`);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const createStore = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/stores', formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const updateStore = async (id: number, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/stores/${id}`, formData, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const deleteStore = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/stores/${id}`, config);
    const store = data?.data;
    return store;
  } catch (err) {
    console.error(err);
  }
};

export const getDistanceStores = async (userLocation: IUserLocation) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post(
      `/stores/distance`,
      userLocation,
      config,
    );
    const stores = data?.data;
    return stores;
  } catch (err) {
    console.error(err);
  }
};

