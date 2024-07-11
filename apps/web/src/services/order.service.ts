import { FilterOrder } from '@/interfaces/order.interface';
import instance from '@/utils/instances';
import { Axios, AxiosError } from 'axios';
import { headers } from 'next/headers';

export const getOrder = async ({
  user_id = 0,
  page = 1,
  pageSize = 10,
}: FilterOrder) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };


    const { data } = await instance.get(
      `/order`, config
    );
    const order = data?.data;

    console.log(data)

    return order;
  } catch (err) {
    console.log(err);
  }
};

export const getOrderByID = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await instance.get(`order/${id}`, config).then ((res)=> res.data).catch((error)=> {if (error instanceof AxiosError) error.response?.data
      return {data:[]}
    } );
    const order = res.data;
    return order;
  } catch (err) {
    console.log(err);
  }
};

export const createOrder = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await instance.post('/order', formData, config);
    const createOder = data?.data;
    return createOrder;
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
