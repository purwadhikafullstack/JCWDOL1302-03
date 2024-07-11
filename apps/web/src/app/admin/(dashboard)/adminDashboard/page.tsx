"use client";

import React, { useState, useEffect } from 'react';
import api from '@/api/apiApp';

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

interface User{
    username: string
}

const AdminDashboard = () => {
    const [address, setAddress] = useState<Address[]>([]);
    const [product, setProduct] = useState<Product[]>([]);
    const [stores, setStore] = useState<Store[]>([]);
    const [order, setOrder] = useState<User[]>([])

    const getListAddress = async () => {
        try {
            const result = await api.get("/api/address");
            setAddress(result.data.data);
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    const getProduct = async () => {
        try {
            const result = await api.get("/api/product");
            setProduct(result.data.data.products);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const getStore = async () => {
        try {
            const result = await api.get("/api/stores");
            console.log(result.data); // Log hasil dari API
            if (Array.isArray(result.data.data.stores)) {
                setStore(result.data.data.stores);
            } else {
                console.error("Data stores bukan array:", result.data.data.stores);
            }
        } catch (error) {
            console.error("Error fetching store:", error);
        }
    };

    const getOrder = async () => {
        try {
            const result = await api.get("/api/order");
            setOrder(result.data.data.order);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    useEffect(() => {
        getListAddress();
        getProduct();
        getStore();
        getOrder()
    }, []);


    



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-green-500">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                <div className="bg-red-200 w-full p-6 rounded-lg shadow-md">
                    <p className="text-gray-500">TOTAL PRODUCT</p>
                    <p className="text-3xl font-bold text-green-500">{product.length}</p>
                </div>
                <div className="bg-green-200 w-full p-6 rounded-lg shadow-md">
                    <p className="text-gray-500">TOTAL ALAMAT</p>
                    <p className="text-3xl font-bold text-green-500">{address.length}</p>
                </div>
                <div className="bg-blue-200 w-full p-6 rounded-lg shadow-md">
                    <p className="text-gray-500">TOTAL STORE</p>
                    <p className="text-3xl font-bold text-green-500">{stores.length}</p>
                </div>
                <div className="bg-yellow-200 w-full p-6 rounded-lg shadow-md">
                    <p className="text-gray-500">TOTAL ORDER</p>
                    <p className="text-3xl font-bold text-green-500">{order.length}</p>
                </div>
            </div>
        </div>
    );
}

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