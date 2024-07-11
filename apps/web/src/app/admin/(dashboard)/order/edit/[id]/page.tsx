'use client';

import React, { useState, useEffect } from 'react';
import { getOrderByID } from '@/services/order.service';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';

import { Order } from '@/interfaces/order.interface';
import api from '@/api/apiApp';

type Props = { params: { id: number } };
// interface Category {
//   id: number;
//   category: string;
// }

const Page = ({ params: { id } }: Props) => {
  const [order, setOrder] = useState <Order>();

  //   const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //   const getListCategories = async () => {
  //     try {
  //       const result = await api.get('/api/categories');
  //       setCategories(result.data.data);
  //     } catch (error) {
  //       console.error('Failed to fetch categories:', error);
  //     }
  //   };

  //   useEffect(() => {
  //     getListCategories();
  //   }, []);

  useEffect(() => {
    (async () => {
      const data = await getOrderByID(id);
      setOrder(data);
    })();
  }, [id]);

  //   type ChangeEvent =
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLTextAreaElement>
  //     | React.ChangeEvent<HTMLSelectElement>;

  //   const handleChange = (e: ChangeEvent) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     setIsLoading(true);
  //     e.preventDefault();

  //     try {
  //       const formDataWithAdminIdAsNumber = {
  //         ...formData,
  //         user_id: parseInt(formData.user_id, 10),
  //         store_id: parseInt(formData.store_id, 10),
  //         store_id: parseInt(formData.store_id, 10),
  //         price: parseInt(formData.price) || null,
  //         stock: parseInt(formData.stock) || null,
  //       };

  //       const product = await updateProduct(id, formDataWithAdminIdAsNumber);
  //       if (!product) throw new Error('Update product failed!');
  //       alert('Update product success');
  //       router.push('/admin/product');
  //     } catch (err) {
  //       console.error(err);
  //       alert('Update product failed');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <>
      <Container>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
         
            < div >
    <h1>{order?.user_id} OK</h1>
    <a href="#">
              <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                 tes
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {Array(4).fill(0).map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
              </div>
            </div>
  </div>


      </div>


    </Container >
    </>
  );
};

export default Page;
