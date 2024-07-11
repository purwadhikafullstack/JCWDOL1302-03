'use client';

import React, { useState, useEffect } from 'react';
import { getProductByID, updateProduct } from '@/services/prouduct.service';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import api from '@/api/apiApp';

type Props = { params: { id: number } };
interface Category {
  id: number;
  category: string;
}

const Page = ({ params: { id } }: Props) => {
  const [formData, setFormData] = useState({
    admin_id: '',
    name: '',
    description: '',
    price: '',
    category_id: '',
    image: '',
    stock: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getListCategories = async () => {
    try {
      const result = await api.get('/api/categories');
      setCategories(result.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    getListCategories();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getProductByID(id);
      setFormData({
        admin_id: data.admin_id,
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        image: data.image,
        stock: data.stock,
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
        admin_id: parseInt(formData.admin_id, 10),
        price: parseInt(formData.price) || null,
        stock: parseInt(formData.stock) || null,
      };

      const product = await updateProduct(id, formDataWithAdminIdAsNumber);
      if (!product) throw new Error('Update product failed!');
      alert('Update product success');
      router.push('/admin/product');
    } catch (err) {
      console.error(err);
      alert('Update product failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">EDIT PRODUCT</h2>
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="price" className="block">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block">
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="imagePreview" className="block">
                  Image Preview
                </label>
                {formData.image && (
                  <img
                    src={formData.image} // Menggunakan URL gambar
                    alt="Product Image"
                    className="w-full h-auto mb-2"
                  />
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({
                        ...formData,
                        image: URL.createObjectURL(file), // Menyimpan URL gambar sementara
                      });
                    }
                  }}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Edit Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>/
    </>
  );
};

export default Page;
