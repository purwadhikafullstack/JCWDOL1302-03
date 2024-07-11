import { Store } from '@prisma/client';

export interface IStore {
  admin_id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface FilterStore {
  name?: string;
  page?: number;
  pageSize?: number;
}

export interface ResultStore {
  stores: Store[];
  pages: number;
}

export interface IUserLocation {
  longitude?: number;
  latitude?: number;
}
