'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import api from '@/api/apiApp';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface FormData {
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  postalCode: string;
  address: string;
}

const AddAddress: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    country: 'Indonesia',
    province: '',
    city: '',
    subdistrict: '',
    postalCode: '',
    address: '',
  });

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'province') {
      const selectedProvince = provinces.find(
        (prov) => prov.province === value,
      );
      if (selectedProvince) {
        fetchCities(selectedProvince.province_id);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newFormData = { ...formData };
      const result = await api.post('/api/address', newFormData);
      router.push('/address');
      toast.success('Berhasil tambah address');
      console.log(result);
    } catch (error) {
      toast.error('Gagal tambah alamat');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        CREATE ADDRESS
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="country" className="block">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block">
            Province
          </label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
            required
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province}>
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
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
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
          <label htmlFor="subdistrict" className="block">
            Subdistrict
          </label>
          <input
            type="text"
            id="subdistrict"
            name="subdistrict"
            value={formData.subdistrict}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
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
            value={formData.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
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
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
