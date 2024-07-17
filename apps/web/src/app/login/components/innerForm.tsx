import Container from '@/components/Container';
import { FormikProps } from 'formik';
import { FormValues } from '@/app/login/types/login.type';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;
  const router = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const check = router === '/login';

  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {router === '/login' ? 'User' : 'Admin'} Login to Cheery fresh
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block ">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  title="email"
                  onChange={handleChange}
                  value={values.email}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                    touched.email && errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {touched.email && errors.email ? (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block ">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  title="password"
                  onChange={handleChange}
                  value={values.password}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                    touched.password && errors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {touched.password && errors.password ? (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
              {check && (
                <div className="text-center">
                  <p className="mt-4 text-center text-sm">
                    New to Cheery fresh?{' '}
                    <Link
                      href="/register"
                      className="text-blue-500 hover:text-blue-800"
                    >
                      Register here!
                    </Link>{' '}
                  </p>
                  <p className="mt-2 text-center text-sm">
                    Forgot your own password?{' '}
                    <Link
                      href="/login/resetpassword"
                      className="text-blue-500 hover:text-blue-800"
                    >
                      Reset here!
                    </Link>{' '}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
