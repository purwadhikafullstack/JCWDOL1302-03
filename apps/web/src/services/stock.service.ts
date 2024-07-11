import { FilterStock } from '@/interfaces/stock.interface';
import instance from '@/utils/instances';
import { headers } from 'next/headers';

export const getStock = async ({
  store_id = 0,
  page = 1,
  pageSize = 10,
}: FilterStock) => {
  try {
    const { data } = await instance.get(
      `/stock?store_id=${store_id}&page=${page}&pageSize=${pageSize}`,
    );
    const stock = data?.data;

    console.log(data)

    return stock;
  } catch (err) {
    console.log(err);
  }
};

export const getStockByID = async (id: number) => {
  try {
    const { data } = await instance.get(`stock/${id}`);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.log(err);
  }
};

export const createStock = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await instance.post('/stock', formData, config);
    const createStock = data?.data;
    return createStock;
  } catch (err) {
    console.log(err);
  }
 
};

export const updateStock = async (id: number, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/stock/${id}`, formData, config);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.log(err);
  }
};

export const deleteStock = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/stock/${id}`, config);
    const stock = data?.data;
    return stock;
  } catch (err) {
    console.error(err);
  }
};
