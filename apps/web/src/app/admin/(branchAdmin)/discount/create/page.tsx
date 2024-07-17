'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AdminPayload } from '@/interfaces/payload.interface';

export default function CreateDiscount() {
  const [token, setToken] = useState<AdminPayload | null>(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(jwtDecode<AdminPayload>(tokenFromLocalStorage));
    }
  }, []);

  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const type = [
    { name: 'select one of these option', value: 'firstoption' },
    { name: 'Percentage', value: 'percentage' },
    { name: 'Nominal', value: 'nominal' },
  ];
  const formik = useFormik({
    initialValues: {
      store_id: 0,
      type: '',
      value: '',
      minPurchase: '',
      maxPurchase: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: Yup.object({
      store_id: Yup.number().required('Store ID is required'),
      type: Yup.string().required('Type is required'),
      value: Yup.number().required('Value is required'),
      minPurchase: Yup.number().required('Min Purchase is required'),
      maxPurchase: Yup.number().required('Max Purchase is required'),
      startDate: Yup.date().required('Start Date is required'),
      endDate: Yup.date().required('End Date is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const startDateISO = new Date(values.startDate).toISOString();
      const endDateISO = new Date(values.endDate).toISOString();

      const formattedValues = {
        ...values,
        startDate: startDateISO,
        endDate: endDateISO,
      };

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API}/discount/create`,
          formattedValues,
        );
        // Assuming your API returns a token or some kind of user data
        console.log(response.data);
        router.push(`/admin/stores/discount`); // Redirect to a different page on success
      } catch (error) {
        router.push(`/admin/stores/discount/create`);
        setError(`${error}`);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create discount for {token?.username}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="store_id" className="block ">
                Store ID
              </label>
              <input
                id="store_id"
                name="store_id"
                type="number"
                title="store_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.store_id}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.store_id && formik.errors.store_id
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.store_id && formik.errors.store_id ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.store_id}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block ">
                Type
              </label>
              <select
                name="type"
                id="type"
                onBlur={formik.handleBlur}
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                {type.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              {formik.touched.type && formik.errors.type ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.type}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="value" className="block ">
                Value
              </label>
              <input
                id="value"
                name="value"
                type="text"
                title="value"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.value}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.value && formik.errors.value
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.value && formik.errors.value ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.value}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="minPurchase" className="block ">
                Min Purchase
              </label>
              <input
                id="minPurchase"
                name="minPurchase"
                type="number"
                title="minPurchase"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.minPurchase}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.minPurchase && formik.errors.minPurchase
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.minPurchase && formik.errors.minPurchase ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.minPurchase}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="maxPurchase" className="block ">
                Max Purchase
              </label>
              <input
                id="maxPurchase"
                name="maxPurchase"
                type="number"
                title="maxPurchase"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maxPurchase}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.maxPurchase && formik.errors.maxPurchase
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.maxPurchase && formik.errors.maxPurchase ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.maxPurchase}
                </p>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="startDate" className="block ">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                title="startDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.startDate && formik.errors.startDate
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.startDate}
                </p>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="endDate" className="block ">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                title="endDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.endDate && formik.errors.endDate
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.endDate}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
            >
              {isLoading ? 'Loading...' : 'Create'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
