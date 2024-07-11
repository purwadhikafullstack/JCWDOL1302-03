'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Please input your email'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
          values,
        );
        // Assuming your API returns a token or some kind of user data
        console.log(response.data);
        router.push('/register/verify'); // Redirect to a different page on success
      } catch (error) {
        setError('Invalid register credentials');
      }
    },
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register for Cheery fresh
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="Email" className="block ">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                title="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                className="text-blue-500 hover:text-blue-800"
                href={'/login'}
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
