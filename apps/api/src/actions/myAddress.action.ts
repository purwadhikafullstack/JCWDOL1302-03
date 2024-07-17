import { IAddress } from '@/interfaces/address.interface';
import {
  createMyAddressQuery,
  getMyAddressQuery,
  updateMyAddressQuery,
  deleteMyAddressQuery,
  getStatusMyAddressQuery,
} from '@/queries/myAddress.query';

const createMyAddressAction = async (data: IAddress, token: any) => {
  try {
    const address = await createMyAddressQuery(data, token);

    return address;
  } catch (err) {
    throw err;
  }
};

const getMyAddressAction = async (token: any): Promise<IAddress[]> => {
  try {
    const addressId = await getMyAddressQuery(token);

    return addressId;
  } catch (err) {
    throw err;
  }
};

const getStatusMyAddressAction = async (token: any): Promise<IAddress[]> => {
  try {
    const addressId = await getStatusMyAddressQuery(token);

    return addressId;
  } catch (err) {
    throw err;
  }
};

const updateMyAddressAction = async (
  id: number,
  filters: {
    // address?: string
    city?: string;
    // state?: string
    postalCode?: string;
    country?: string;
    isPrimary?: boolean;
    province?: string;
    subdistrict?: string;
  },
) => {
  try {
    const updateAddress = await updateMyAddressQuery(id, filters);

    return updateAddress;
  } catch (err) {
    throw err;
  }
};

const deleteMyAddressAction = async (id: number): Promise<IAddress> => {
  try {
    const deleteAddress = await deleteMyAddressQuery(id);

    return deleteAddress;
  } catch (err) {
    throw err;
  }
};

export {
  createMyAddressAction,
  getMyAddressAction,
  updateMyAddressAction,
  deleteMyAddressAction,
  getStatusMyAddressAction,
};
