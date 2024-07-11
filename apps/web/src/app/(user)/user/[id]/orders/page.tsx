'use client';

import { Order } from '@/interfaces/order.interface';
import instance from '@/utils/instances';
import React, { useState, useEffect } from 'react';

export default function OrderListPage({ params }: { params: { id: number } }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/order/${params.id}/orders`);
        console.log(response);
        setOrders(response.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [params.id]);

  const handleConfirmOrder = async (orderID: number) => {
    try {
      await instance.post(`/order/confirm/${orderID}`);
      const updateOrders = orders.map((order) => {
        if (order.id === orderID) {
          return { ...order, status: 'CONFIRMED BY USER' };
        }
        return order;
      });
      setOrders(updateOrders);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      <h1 className="text-center text-2xl pb-4 font-bold">Your Orders</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ) &&
            orders.map((order) => (
              <li key={order.id} className="py-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Order {order.id}</span>
                  <span className="text-sm text-gray-600">
                    {order.status === 'CONFIRMED BY USER'
                      ? new Date(order.updateAt).toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          timeZoneName: 'short',
                        })
                      : new Date(order.createdAt).toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          timeZoneName: 'short',
                        })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-lg">
                    Total Amount:{' '}
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(order.totalAmount)}
                  </span>
                  <span
                    className={`text-sm ${
                      order.status === 'CONFIRMED BY USER'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {order.status === 'CONFIRMED BY USER'
                      ? 'CONFIRMED'
                      : 'SHIPPED'}
                  </span>
                </div>
                {order.status !== 'CONFIRMED BY USER' && (
                  <button
                    onClick={() => handleConfirmOrder(order.id)}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Confirm
                  </button>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
