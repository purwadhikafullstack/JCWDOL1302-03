export interface FilterStore {
  name?: string;
  page?: number;
  pageSize?: number;
}

export interface IUserLocation {
  longitude?: number;
  latitude?: number;
}

export interface IStore {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
}
