'use client';

import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreatePayment({ params }: { params: { id: number } }) {
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const method = [
    { name: 'select one of these option', value: 'firstoption' },
    { name: 'BRI', value: 'BRI' },
    { name: 'BCA', value: 'BCA' },
    { name: 'GOPAY', value: 'GOPAY' },
    { name: 'BANK BERSAMA', value: 'BANKBERSAMA' },
  ];
  const formik = useFormik({
    initialValues: {
      method: '',
      proof: '',
    },
    validationSchema: Yup.object({
      method: Yup.string()
        .required('Select field is required')
        .oneOf(['BRI', 'BCA', 'GOPAY', 'BANKBERSAMA'], 'Invalid option'),
      proof: Yup.mixed().required('File is required'),
    }),
    onSubmit: async (values) => {
      const body = new FormData();
      body.append('method', values.method);
      body.append('proof', values.proof);
      setIsLoading(true);
      try {
        console.log(body.getAll('proof'));
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_API}/payment/update/${Number(params.id)}`,
          body,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // Assuming your API returns a token or some kind of user data
        console.log(response.data);
        router.push('/products'); // Redirect to a different page on success
      } catch (error) {
        setError('Error with order_id');
      }
    },
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Upload your payment proofment to procced payment id {params.id}!
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="method" className="block ">
                Method
              </label>
              <select
                name="method"
                id="method"
                onBlur={formik.handleBlur}
                value={formik.values.method}
                onChange={formik.handleChange}
              >
                {method.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              {formik.touched.method && formik.errors.method ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.method}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="proof" className="block ">
                Proof
              </label>
              <input
                id="proof"
                name="proof"
                type="file"
                title="proof"
                accept="image/*"
                onChange={(e) => {
                  if (!e.currentTarget.files) {
                    return;
                  }
                  formik.setFieldValue('proof', e.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.proof && formik.errors.proof
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.proof && formik.errors.proof ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.proof}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
            >
              {isLoading ? 'Loading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
