import { Store } from '@prisma/client';
import haversine from 'haversine';

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
  if (!userLocation.longitude || !userLocation.latitude) return null;

  let nearestdistance = null;
  let nearestStore = null;

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

      if (nearestdistance === null || distance < nearestdistance) {
        nearestdistance = distance;
        nearestStore = store;
      }
    }
  }

  return nearestStore;
};
