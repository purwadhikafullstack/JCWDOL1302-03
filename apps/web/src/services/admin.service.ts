import instance from '@/utils/instances';
import { IAdmin, IFilterAdmin } from '@/interfaces/admin.interface';
import { loadBindings } from 'next/dist/build/swc';
import { headers } from 'next/headers';

export const getAllAdmin = async ({
  email = '',
  page = 1,
  pageSize = 10,
}: IFilterAdmin) => {
  try {
    const { data } = await instance.get(
      `/admin?email=${email}&page=${page}&pageSize=${pageSize}`,
    );
    const admins = data.data;

    return admins;
  } catch (err) {
    console.log(err);
  }
};

export const getAdminByID = async (id: number) => {
  try {
    const { data } = await instance.get(`/admin/${id}`);
    const admin = data?.data;
    return admin;
  } catch (e) {
    console.log(e);
  }
};

export const createAdmin = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/admin', formData, config);
    const admin = data?.data;
    return admin;
  } catch (e) {
    console.error(e);
  }
};

export const updateAdmin = async (id: number, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/admin/${id}`, formData, config);
    const admin = data?.data;
    return admin;
  } catch (e) {
    console.error(e);
  }
};

export const deleteAdmin = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.delete(`/admin/${id}`, config);
    const admin = data?.data;
    return admin;
  } catch (e) {
    console.error(e);
  }
};
