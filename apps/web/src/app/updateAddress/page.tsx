'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '@/api/apiApp';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface FormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
  subdistrict: string;
}

interface UpdateAddressProps {
  id: string; // Assume you pass the addressId as a prop
}

const UpdateAddress = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    province: '',
    subdistrict: '',
  });

  const params = useParams();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.put(`/api/address/:${params.id}`);
        setFormData(response.data);
      } catch (error) {
        toast.error('Failed to fetch address data');
      }
    };

    fetchAddress();
  }, [params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData };
      const result = await api.put(
        `/api/address/${params.id}`,
        updatedFormData,
      );
      router.push('/address');
      toast.success('Successfully updated address');
      console.log(result);
    } catch (error) {
      toast.error('Failed to update address');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Address
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700"
          >
            Province
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subdistrict"
            className="block text-sm font-medium text-gray-700"
          >
            Subdistrict
          </label>
          <input
            type="text"
            id="subdistrict"
            name="subdistrict"
            value={formData.subdistrict}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAddress;
