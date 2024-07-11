'use client';

import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import instance from '@/utils/instances';
import { checkToken } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Verified } from '@/interfaces/user.interface';

export default function UpdatePasswordPage() {
  const [see, setSee] = useState('password');
  const seePassword = () => {
    see === 'password' ? setSee('text') : setSee('password');
  };
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: async ({ password }: Verified) => {
      setIsLoading(true);
      try {
        const param = params.toString().replace('token=', '');
        await instance.post(
          '/auth/resetconfirmation/updatepassword',
          {
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${param}`,
            },
          },
        );
        alert('Your password has been updated :)');
        router.push('/login');
      } catch (e) {
        console.error(e);
      }
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(checkToken(token));
      }
    }
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Enter your new password!
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block ">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={see}
                  title="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block ">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={see}
                  title="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                <input
                  title="seePassword"
                  type="checkbox"
                  onClick={seePassword}
                />{' '}
                Peek Password
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
              >
                {isLoading ? 'Loading...' : 'Verify'}
              </button>
            </form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}
