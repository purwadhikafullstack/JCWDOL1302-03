'use client';

import { Admin } from '@/interfaces/auth.admin.interface';
import { Products } from '@/interfaces/product.interface';
import instance from '@/utils/instances';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BranchProductsList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      const admin: Admin = JSON.parse(storedAdmin);
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await instance.get(`/product/admin/${admin.id}/all`);
          console.log(response);
          setProducts(response.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    } else {
      // Handle the case when admin is not logged in
      console.error('Admin is not logged in');
    }
  }, []);
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white shadow-md rounded p-4">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PRUDUCT_IMAGE_URL}/IMG1719018853881.png`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t"
                  width={20}
                  height={20}
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-gray-600">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(product.price)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
