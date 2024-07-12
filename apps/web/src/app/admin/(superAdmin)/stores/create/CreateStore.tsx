'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createStore } from '@/services/store.service';
import Container from '@/components/Container';
import api from '@/api/apiApp';

interface Admin {
  id: number;
  admin_id: number;
  username: string;
  email: string;
}

export default function CreateStore() {
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

  useEffect(() => {
    const getListAdmins = async () => {
      try {
        const result = await api.get('/api/admin/');
        setAdmins(result.data.data.admins);
        console.log(result);
      } catch (error) {
        console.error('Failed to Fetch Admins:', error);
      }
    };
    getListAdmins();
  }, []);

  const [provinces, setProvinces] = useState<
    { province: string; province_id: string }[]
  >([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch('/api/rajaongkir/provinces');
      const data = await response.json();
      const provinces = data.rajaongkir.results.map((province: any) => ({
        province: province.province,
        province_id: province.province_id,
      }));
      setProvinces(provinces);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchCities = async (provinceId: string) => {
    try {
      const response = await fetch(
        `/api/rajaongkir/cities?province=${provinceId}`,
      );
      const data = await response.json();
      const cities = data.rajaongkir.results.map((city: any) => city.city_name);
      setCities(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'province') {
      const selectedProvince = provinces.find(
        (prov) => prov.province === e.target.value,
      );
      if (selectedProvince) {
        fetchCities(selectedProvince.province_id);
      }
    }
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
      const store = await createStore(formDataWithAdminIdAsNumber);
      // const store = await createStore(formData);
      if (!store) throw new Error('Create store failed!');
      alert('Create store success');
      router.push('/admin/stores');
    } catch (err) {
      console.error(err);
      alert('Create store failed');
    }
  };

  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              CREATE NEW STORE
            </h2>
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
                  <option value="">Select Email </option>
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
                <select
                  id="province"
                  name="province"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.province}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province}
                    >
                      {province.province}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
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
                  {isLoading ? 'Loading...' : 'Create Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
