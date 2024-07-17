import { FilterProduct, Products } from '@/interfaces/product.interface';
import instance from '@/utils/instances';

// Mengambil daftar produk dengan filter
export const getProducts = async ({
  name = '',
  page = 1,
  pageSize = 10,
}: FilterProduct) => {
  try {
    const { data } = await instance.get(
      `/product?name=${name}&page=${page}&pageSize=${pageSize}`,
    );
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

// Mengambil produk berdasarkan ID
export const getProductByID = async (id: number) => {
  try {
    const { data } = await instance.get(`product/${id}`);
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

// Membuat produk baru dengan FormData
export const createProduct = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await instance.post('/product', formData, config);
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

// Memperbarui produk berdasarkan ID
export const updateProduct = async (id: number, formData: FormData | Partial<Products>) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : undefined,
      },
    };
    const { data } = await instance.patch(`/product/${id}`, formData, config);
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

// Menghapus produk berdasarkan ID
export const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/product/${id}`, config);
    return data?.data;
  } catch (err) {
    console.error(err);
  }
};
