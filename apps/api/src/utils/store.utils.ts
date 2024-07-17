import { Store } from '@prisma/client';
import haversine from 'haversine';

// fungsi untuk mendapatkan toko terdekat dari user
export const getNearestStores = ({
  stores,
  userLocation,
}: {
  stores: Store[];
  userLocation: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
}): Store | null => {
  // cek apakah userlocation punya longitude dan latitude
  if (!userLocation.longitude || !userLocation.latitude) return null;

  let nearestdistance = null;
  let nearestStore = null;

  // Loop melalui setiap store untuk menghitung jaraknya dari userLocation
  for (const store of stores) {
    if (store.longitude && store.latitude) {
      const distance = haversine(
        {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
        },
        {
          longitude: store.longitude,
          latitude: store.latitude,
        },
      );

      // Tentukan apakah jarak saat ini lebih kecil dari jarak terdekat yang telah ditemukan
      if (nearestdistance === null || distance < nearestdistance) {
        nearestdistance = distance;
        nearestStore = store;
      }
    }
  }

  return nearestStore;
};
