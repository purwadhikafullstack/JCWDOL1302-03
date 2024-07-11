'use client';

import React, { useState, useEffect } from 'react';
import { getStoreByID, updateStore } from '@/services/store.service';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import api from '@/api/apiApp';

interface Admin {
  id: number;
  admin_id: number;
  username: string;
  email: string;
}

type Props = { params: { id: number } };

const Page = ({ params: { id } }: Props) => {
  const [formData, setFormData] = useState({
    admin_id: '',
    name: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
    latitude: '',
    longitude: '',
  });
  const [admins, setAdmins] = useState<Admin[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getListAdmins = async () => {
    try {
      const result = await api.get('/api/admin/');
      setAdmins(result.data.data.admins);
      console.log(result);
    } catch (error) {
      console.error('Failed to Fetch Admins:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getStoreByID(id);
      setFormData({
        admin_id: data.admin_id,
        name: data.name,
        address: data.address,
        province: data.province,
        city: data.city,
        postalCode: data.postalCode,
        longitude: data.longitude,
        latitude: data.latitude,
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
        longitude: parseFloat(formData.longitude) || null,
        latitude: parseFloat(formData.latitude) || null,
      };
      const store = await updateStore(id, formDataWithAdminIdAsNumber);
      if (!store) throw new Error('Update store failed!');
      alert('Update store success');
      router.push('/admin/stores');
    } catch (err) {
      console.error(err);
      alert('Update store failed');
    }
  };

  useEffect(() => {
    getListAdmins();
  }, []);

  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">EDIT STORE</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="admin_id" className="block">
                  Admin
                </label>
                <select
                  id="admin_id"
                  name="admin_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.admin_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Email</option>
                  {admins?.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.email}
                    </option>
                  ))}
                </select>
              </div>
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
                <label htmlFor="address" className="block">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="province" className="block">
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.province}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="postalCode" className="block">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="latitude" className="block">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="longitude" className="block">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Update Store'}
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
