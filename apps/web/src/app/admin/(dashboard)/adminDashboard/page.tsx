'use client';

import React, { useState, useEffect } from 'react';
import api from '@/api/apiApp';
import Container from '@/components/Container';
import { useRouter } from 'next/navigation';
import { Admin } from '@/interfaces/auth.admin.interface';

interface Product {
  admin_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
  stock: number;
}

// Interface untuk data alamat
interface Address {
  id: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
  subdistrict: string;
  isPrimary: boolean;
}

interface Store {
  admin_id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

interface User {
  username: string;
}

interface Users {
  username?: string;
  email: string;
  password: string;
  verified: boolean;
  referralCode: string;
  name: string;
  gender: string;
  birthDate: string;
  role: string;
}

interface Admins {
  username: string;
  email: string;
  password: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [address, setAddress] = useState<Address[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [stores, setStore] = useState<Store[]>([]);
  const [order, setOrder] = useState<User[]>([]);
  const [users, setUser] = useState<Users[]>([]);
  const [admins, setAdmins] = useState<Admins[]>([]);

  const getListAddress = async () => {
    try {
      const result = await api.get('/api/address');
      setAddress(result.data.data);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const getProduct = async () => {
    try {
      const result = await api.get('/api/product');
      setProduct(result.data.data.products);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getStore = async () => {
    try {
      const result = await api.get('/api/stores');
      console.log(result.data); // Log hasil dari API
      if (Array.isArray(result.data.data.stores)) {
        setStore(result.data.data.stores);
      } else {
        console.error('Data stores bukan array:', result.data.data.stores);
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  const getOrder = async () => {
    try {
      const result = await api.get('/api/order');
      setOrder(result.data.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const getUsers = async () => {
    try {
      const result = await api.get('/api/user');
      console.log(result.data); // Log hasil dari API
      if (Array.isArray(result.data.data.users)) {
        setUser(result.data.data.users);
      } else {
        console.error('Data user bukan array:', result.data.data.users);
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  const getAdmins = async () => {
    try {
      const result = await api.get('/api/admin');
      console.log(result.data); // Log hasil dari API
      if (Array.isArray(result.data.data.admins)) {
        setAdmins(result.data.data.admins);
      } else {
        console.error('Data user bukan array:', result.data.data.admins);
      }
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  useEffect(() => {
    getListAddress();
    getProduct();
    getStore();
    getOrder();
    getUsers();
    getAdmins();
  }, []);

  return (
    <Container>
      <div className="mt-10">
        <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              Admin
              <a className="text-accentDark"> Dashboard</a>
            </h1>
          </div>
          <div className=" md:justify-self-end space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-accentDark hover:bg-accent rounded"
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <div
            className="bg-cheeryyellow w-full p-6 rounded-lg shadow-md"
            onClick={() => router.push('/admin/users')}
          >
            <p className="text-black font-bold">TOTAL USER</p>
            <p className="text-3xl font-bold text-accentDark">{users.length}</p>
          </div>
          <div
            className="bg-cheeryyellow w-full p-6 rounded-lg shadow-md"
            onClick={() => router.push('/admin/admins')}
          >
            <p className="text-black font-bold">TOTAL ADMIN</p>
            <p className="text-3xl font-bold text-accentDark">
              {admins.length}
            </p>
          </div>
          <div
            className="bg-cheeryyellow w-full p-6 rounded-lg shadow-md"
            onClick={() => router.push('/admin/stores')}
          >
            <p className="text-black  font-bold">TOTAL STORE</p>
            <p className="text-3xl font-bold text-accentDark">
              {stores.length}
            </p>
          </div>
          <div
            className="bg-red-200 w-full p-6 rounded-lg shadow-md"
            onClick={() => router.push('/admin/product')}
          >
            <p className="text-gray-500">TOTAL PRODUCT</p>
            <p className="text-3xl font-bold text-green-500">
              {product.length}
            </p>
          </div>
          <div className="bg-green-200 w-full p-6 rounded-lg shadow-md">
            <p className="text-gray-500">TOTAL ALAMAT</p>
            <p className="text-3xl font-bold text-green-500">
              {address.length}
            </p>
          </div>
          <div className="bg-yellow-200 w-full p-6 rounded-lg shadow-md">
            <p className="text-gray-500">TOTAL ORDER</p>
            <p className="text-3xl font-bold text-green-500">{order.length}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;

// import React from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// const AdminDashboard = () => {
//     return (
//         <div className="flex h-screen">
//           <Sidebar />
//           <div className="flex-1 flex flex-col">
//             <Navbar />
//             <Dashboard />
//           </div>
//         </div>
//       );
//     }

// export default AdminDashboard;
