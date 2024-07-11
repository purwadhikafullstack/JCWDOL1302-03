"use client"

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
  // address: string;

  // state: string;




}

const AddAddress: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    country: '',
    province: '',
    city: '',
    subdistrict: '',
    postalCode: ''



  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newFormData = { ...formData }
      const result = await api.post('/api/address', newFormData)
      router.push('/address')
      toast.success("Berhasil tambah address")
      console.log(result);
    } catch (error) {

    }
    // Lakukan sesuatu dengan data yang di-submit, misalnya kirim ke server


    // Reset form jika diperlukan
    // setFormData({ address: '', city: '', state: '', postalCode: '', country: '', province: '', subdistrict: '' });
  };

  // useEffect(() => {
  //   getListAddress()
  // }, [])

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">CREATE ADDRESS</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="country" className="block">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subdistrict" className="block">Subdistrict</label>
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
          <label htmlFor="postalCode" className="block">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
          />
        </div>



        <div className="flex justify-center">
          <button type="submit" className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200">
            Submit
          </button>
        </div>
      </form>


    </div>
  );
};

export default AddAddress;