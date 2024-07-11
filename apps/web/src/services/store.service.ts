import {
  FilterStore,
  IStore,
  IUSerLocation,
} from '@/interfaces/store.interface';
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

export const getDistanceStores = async (userLocation: IUSerLocation) => {
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
    const stores: IStore[] = data?.data;

    if (!stores) {
      return []; // or throw an error, depending on your requirements
    }

    // Dihitung jarak antara lokasi user dan lokasi toko
    const distances = stores.map((store: IStore) => {
      const lat1 = userLocation.latitude ?? 0;
      const lon1 = userLocation.longitude ?? 0;
      const lat2 = store.latitude ?? 0;
      const lon2 = store.longitude ?? 0;
      const distance = calculateDistance(lat1, lon1, lat2, lon2);
      return { ...store, distance };
    });

    // Filter toko dengan jarak <= 50 km
    const filteredStores = distances.filter(
      (store: IStore) => store.distance <= 30,
    );

    return filteredStores;
  } catch (err) {
    console.log(err);
  }
};

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Jari-jari bumi (km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
