'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { createStock } from '@/services/stock.service';


import api from '@/api/apiApp';


interface Product {
  id: number;
  admin_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number
  image: string

}
export default function CreateStock() {
  const [products, setProducts] = useState<Product[]>([]);


  const getListProduct = async () => {
    try {
      const result = await api.get("/api/product");
      setProducts(result.data.data.products);
      console.log(result);
    } catch (error) {
      console.error("Failed to fetch Product:", error);
    }
  };

  useEffect(() => {
    getListProduct();
  }, []);


  const [formData, setFormData] = useState({
    store_id: '',
    product_id: '',
    description: '',
    quantity: '',
    
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
        const formDataWithAdminIdAsNumber = {
          ...formData,
          
          store_id: parseInt(formData.store_id, 10),
          product: parseInt(formData.product_id, 10),
          quantity: parseFloat(formData.quantity) || null
        };
      const stock = await createStock (formDataWithAdminIdAsNumber);
      // const store = await createStore(formData);
      if (!stock) throw new Error('Create stock failed!');
      alert('Create stock success');
      router.push('/admin/stock');
    } catch (err) {
      console.error(err);
      alert('Create stock failed');
    }
  };
  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              CREATE NEW STOCK
            </h2>
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-4">
                <label htmlFor="admin_id" className="block">
                  Admin ID
                </label>
                <input
                  type="number"
                  id="admin_id"
                  name="admin_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.admin_id}
                  onChange={handleChange}
                  required
                />
              </div> */}
              {/* <div className="mb-4">
                <label htmlFor="store_id" className="block">
                  Store
                </label>
                <input
                  type="text"
                  id="store_id"
                  name="store_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.store_id}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div className="mb-4">
                <label htmlFor="product_id" className="block">
                  Product
                </label>
                <select
                  id="product_id"
                  name="product_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
             

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Create Stock!'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}