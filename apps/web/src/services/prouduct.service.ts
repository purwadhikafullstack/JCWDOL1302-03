import { products } from '@/app/utils/products';
import { FilterProduct } from '@/interfaces/product.interface';
import instance from '@/utils/instances';
import { headers } from 'next/headers';

export const getProducts = async ({
  name = '',
  page = 1,
  pageSize = 10,
}: FilterProduct) => {
  try {
    const { data } = await instance.get(
      `/product?name=${name}&page=${page}&pageSize=${pageSize}`,
    );
    const products = data?.data;

    console.log(data)

    return products;
  } catch (err) {
    console.log(err);
  }
};

export const getProductByID = async (id: number) => {
  try {
    const { data } = await instance.get(`product/${id}`);
    const product = data?.data;
    return product;
  } catch (err) {
    console.log(err);
  }
};


export const createProduct = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    };
    const { data } = await instance.post('/product', formData, config);
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (id: number, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/product/${id}`, formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/product/${id}`, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};
