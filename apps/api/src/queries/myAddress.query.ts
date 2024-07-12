import { PrismaClient } from '@prisma/client';
import { IAddress } from '@/interfaces/address.interface';

const prisma = new PrismaClient();

const createMyAddressQuery = async (data: IAddress, token: any) => {
  try {
    const userId = token.id;

    const {
      city,
      postalCode,
      country,
      isPrimary,
      province,
      subdistrict,
      address,
    } = data;

    const myAddress = await prisma.address.create({
      data: {
        user_id: userId,

        city,
        postalCode,
        country,
        isPrimary,
        province,
        subdistrict,
        address,
      },
    });

    return myAddress;
  } catch (err) {
    throw err;
  }
};

const getMyAddressQuery = async (token: any): Promise<IAddress[]> => {
  try {
    const userId = token.id;

    const address = await prisma.address.findMany({
      where: {
        user_id: userId,
      },
    });
    return address;
  } catch (err) {
    throw err;
  }
};

const getStatusMyAddressQuery = async (token: any): Promise<IAddress[]> => {
  try {
    const userId = token.id;

    const address = await prisma.address.findMany({
      where: {
        user_id: userId,
        isPrimary: true,
      },
    });
    return address;
  } catch (err) {
    throw err;
  }
};

const updateMyAddressQuery = async (
  id: number,
  filters: {
    // address?: string;
    city?: string;
    // state?: string;
    postalCode?: string;
    country?: string;
    // latitude?: string;
    // longitude?: string;
    isPrimary?: boolean;
    province?: string;
    subdistrict?: string;
  },
): Promise<IAddress> => {
  try {
    const updateAddress = await prisma.address.update({
      where: { id },

      data: {
        ...filters,
      },
    });

    return updateAddress;
  } catch (err) {
    throw err;
  }
};

const deleteMyAddressQuery = async (id: number): Promise<IAddress> => {
  try {
    const deleteAddress = await prisma.address.delete({
      where: { id },
    });

    return deleteAddress;
  } catch (err) {
    throw err;
  }
};

export {
  createMyAddressQuery,
  getMyAddressQuery,
  updateMyAddressQuery,
  deleteMyAddressQuery,
  getStatusMyAddressQuery,
};
