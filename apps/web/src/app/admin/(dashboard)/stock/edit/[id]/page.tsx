'use client';

import React, { useState, useEffect } from 'react';
import { getStockByID, updateStock } from '@/services/stock.service';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import api from '@/api/apiApp';

type Props = { params: { id: number } };
interface Product {
  id: number
  admin_id: number
  name: string
  description: string
  price: number
  category_id: number
  image: string
}
const Page = ({ params: { id } }: Props) => {
  const [formData, setFormData] = useState({
    store_id: '',
    product_id: '',
    description: '',
    quantity: '',
  });

    const [products, setProduct] = useState<Product[]>([])
  const getListProduct = async ()=> {
    try {
      const result = await api.get('/api/product/')
      setProduct(result.data.data.products)
      console.log(result)
    } catch (err) {
      console.log('failed to fetch product', err)
    }
  }
  
  useEffect(()=> {
    getListProduct()
  },[])

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getStockByID(id);
      setFormData({
        store_id: data.store_id,
        product_id: data.product.id,
        description: data.description,
        quantity: data.quantity
      });
    })();
  }, [id]);

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
        product_id: parseInt(formData.product_id, 10),// or Number(formData.admin_id)
        quantity: parseInt(formData.quantity) || null,
        
        
      };
      const stock = await updateStock(id, formDataWithAdminIdAsNumber);
      if (!stock) throw new Error('Update stock failed!');
      alert('Update stock success');
      router.push('/admin/stock');
    } catch (err) {
      console.error(err);
      alert('Update stock failed');
    }
  };

  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">EDIT STOCK</h2>
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-4">
                <label htmlFor="store" className="block">
                STORE
                </label>
                <input
                  type="text"
                  id="store"
                  name="store"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.store_id}
                  onChange={handleChange}
                  readOnly
                />
              </div> */}
             
              <div className="mb-4">
                <label htmlFor="product" className="block">
                  Product
                </label>
                <select
                  id="product"
                  name="product_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih kategori</option>
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
                  required
                />
              </div>
              
              
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Edit Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page;
