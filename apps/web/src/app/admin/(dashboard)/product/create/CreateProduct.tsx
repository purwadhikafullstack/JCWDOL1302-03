'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { createProduct } from '@/services/prouduct.service';
import api from '@/api/apiApp';

interface Category {
  id: number;
  category: string;
}

export default function CreateProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: '',
    admin_id: '' // Tambahkan admin_id di sini
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getListCategories = async () => {
      try {
        const result = await api.get("/api/categories");
        setCategories(result.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getListCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value, files } = e.target;
      if (name === 'image' && files) {
        setSelectedImage(files[0]);
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (e.target instanceof HTMLSelectElement) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category_id', formData.category_id);
    data.append('stock', formData.stock);
    data.append('admin_id', formData.admin_id);
    if (selectedImage) data.append('image', selectedImage);

    try {
      await createProduct(data); // Panggil fungsi API dengan FormData
      alert('Create product success');
      router.push('/admin/product');
    } catch (err) {
      console.error(err);
      alert('Create product failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            CREATE NEW PRODUCT
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
              <label htmlFor="image" className="block">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                onChange={handleChange}
                required
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
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
              >
                {isLoading ? 'Loading...' : 'Create Store'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
