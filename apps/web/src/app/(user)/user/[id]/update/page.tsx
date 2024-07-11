'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function UpdateUser({ params }: { params: { id: number } }) {
  const [token, setToken] = useState<TokenPayload | null>(null);
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(jwtDecode<TokenPayload>(tokenFromLocalStorage));
    }
  }, []);

  interface TokenPayload {
    id: number;
    username: string;
    email: string;
    gender: string;
    name: string;
    password: string;
    birthDate: string;
    profilePicture: string;
    role_id: number;
    iat: number;
    exp: number;
  }
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const gender = [
    { name: 'select one of these option', value: 'firstoption' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
  ];

  const formik = useFormik({
    initialValues: {
      email: token?.email,
      password: token?.password,
      username: token?.username,
      name: token?.name,
      gender: token?.gender,
      birthDate: token?.birthDate
        ? new Date(token.birthDate).toISOString().split('T')[0]
        : '',
      profilePicture: token?.profilePicture,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format'),
      password: Yup.string().min(6, 'Password must be at least 6 characters'),
      username: Yup.string(),
      name: Yup.string(),
      gender: Yup.string().oneOf(['Male', 'Female'], 'Invalid option'),
      birthDate: Yup.date(),
      profilePicture: Yup.mixed()
        .test('fileType', 'Please upload a valid image file', (value) => {
          if (value instanceof File) {
            return ['image/jpeg', 'image/png', 'image/gif'].includes(
              value.type,
            );
          }
          return false;
        })
        .test('fileSize', 'File size must be less than 1MB', (value) => {
          if (value instanceof File) {
            return value.size < 1 * 1024 * 1024;
          }
          return false;
        }),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = new FormData();
      if (values.email) {
        body.append('email', values.email);
      }
      if (values.username) {
        body.append('username', values.username);
      }
      if (values.name) {
        body.append('name', values.name);
      }
      if (values.gender) {
        body.append('profilePicture', values.gender);
      }
      if (values.password) {
        body.append('password', values.password);
      }
      if (values.birthDate) {
        body.append('birthDate', new Date(values.birthDate).toISOString());
      }
      if (values.profilePicture) {
        body.append('profilePicture', values.profilePicture);
      }
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_API}/user/update/${Number(params.id)}`,
          body,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // Assuming your API returns a token or some kind of user data
        console.log(response.data);
        router.push(`/user/${params.id}`); // Redirect to a different page on success
      } catch (error) {
        router.push(`/user/${params.id}/update`);
        setError(`${error}`);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full  p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Updating Profile id {params.id}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block ">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                title="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email ? formik.values.email : token?.email}
                defaultValue={token?.email}
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
            <div className="mb-4">
              <label htmlFor="password" className="block ">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                title="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values.password
                    ? formik.values.password
                    : token?.password
                }
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
              <label htmlFor="username" className="block ">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                title="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values.username
                    ? formik.values.username
                    : token?.username
                }
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.username && formik.errors.username
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block ">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                title="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name ? formik.values.name : token?.name}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block ">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                onBlur={formik.handleBlur}
                value={
                  formik.values.gender ? formik.values.gender : token?.gender
                }
                onChange={formik.handleChange}
                defaultValue={token?.gender}
              >
                {gender.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </p>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="birthDate" className="block ">
                Birth Date
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                title="birthDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values.birthDate
                    ? formik.values.birthDate
                    : token?.birthDate
                      ? new Date(token?.birthDate).toISOString().split('T')[0]
                      : ''
                }
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.birthDate && formik.errors.birthDate
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.birthDate && formik.errors.birthDate ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.birthDate}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="profilePicture" className="block ">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                title="profilePicture"
                accept="image/*"
                onChange={(e) => {
                  if (!e.currentTarget.files) {
                    return;
                  }
                  formik.setFieldValue(
                    'profilePicture',
                    e.currentTarget.files[0],
                  );
                }}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  formik.touched.profilePicture && formik.errors.profilePicture
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.profilePicture && formik.errors.profilePicture ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.profilePicture}
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
