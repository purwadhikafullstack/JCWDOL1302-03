'use client';
import React, { useState, useEffect } from 'react';
import { getOrderByID } from '@/services/order.service';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { Order } from '@/interfaces/order.interface';
import Image from 'next/image';

type Props = { params: { id: number } };

const Page = ({ params: { id } }: Props) => {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderByID(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <Container>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div>
            <a href="#">
              <Image
                className="p-20 -mt-16 rounded-t-lg"
                src="/logo.png"
                alt="product image"
                width={500}
                height={500}
              />
            </a>
            <div className="px-5 -mt-12 pb-5">
              <a href="#">
                <h5 className=" text-4xl mb-5 font-bold tracking-tight text-gray-900 dark:text-white">
                  {order?.user?.name || 'Unknown User'}
                </h5>
              </a>
              <h1 className="border-b border-gray-200 mb-1">
                Store: {order?.store?.name}
              </h1>
              <div className="border-b border-gray-200 text-red-600 mb-1 text-lg font-bold">
                Status: {order?.status}
              </div>{' '}
              {/* Status with red color */}
              <h1>Order Items:</h1>
              {order?.orderItem.map((item) => (
                <div key={item.id} className="px-5 border-b border-gray-200">
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
              ))}
              <div className="flex items-center mt-3">
                {/* Rating stars */}
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <svg
                        key={index}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  Rp.{order?.totalAmount},-
                </span>
                <button
                  onClick={() => router.back()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
