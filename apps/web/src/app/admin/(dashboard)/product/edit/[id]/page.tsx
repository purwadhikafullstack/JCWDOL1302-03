'use client';

import React, { useState, useEffect } from 'react';
import { getProductByID, updateProduct } from '@/services/prouduct.service';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import api from '@/api/apiApp';
import Image from 'next/image';

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
    image: '', // Include image in the state
    stock: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories for the dropdown
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

  // Fetch product details to populate the form
  useEffect(() => {
    (async () => {
      const data = await getProductByID(id);
      setFormData({
        admin_id: data.admin_id.toString(),  // Convert number to string
        name: data.name,
        description: data.description,
        price: data.price.toString(),       // Convert number to string
        category_id: data.category_id.toString(),  // Convert number to string
        image: data.image ? `uploads/${data.image}` : '',  // Adjust image path
        stock: data.stock.toString(),       // Convert number to string
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
        admin_id: parseInt(formData.admin_id, 10),
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price, 10) || 0,
        category_id: parseInt(formData.category_id, 10),
        image: formData.image,  // Use existing image URL
        stock: parseInt(formData.stock, 10) || 0,
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
            <h2 className="text-2xl font-bold mb-6 text-center">
              EDIT PRODUCT
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
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
                <label htmlFor="category_id" className="block">
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
                  <Image
                    src={formData.image.startsWith('http') ? formData.image : `/${formData.image}`}
                    alt="Product Image"
                    width={400}  // Set a default width for the image
                    height={300} // Set a default height for the image
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
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block">
                  Stock
                </label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Edit Product'}
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
