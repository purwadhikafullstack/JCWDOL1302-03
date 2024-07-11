'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import api from '@/api/apiApp';
import { createAdmin } from '@/services/admin.service';

interface Role {
  id: number;
  role: string;
}

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role_id: '',
  });
  const [emails, setEmails] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const getListEmail = async () => {
      try {
        const result = await api.get('/api/user/email');
        setEmails(result.data.emails);
        console.log(result);
      } catch (error) {
        console.error('Failed to Fetch Admins:', error);
      }
    };
    getListEmail();
  }, []);

  useEffect(() => {
    const getListRole = async () => {
      try {
        const result = await api.get('/api/role');
        setRoles(result.data.data);
        console.log(result);
      } catch (error) {
        console.log('failed to fetch role', error);
      }
    };
    getListRole();
  }, []);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const formDataWithRoleIdAsNumber = {
        ...formData,
        role_id: parseInt(formData.role_id, 10),
      };

      const admin = await createAdmin(formDataWithRoleIdAsNumber);
      alert('Create admin success');
      router.push('/admin/admins');
    } catch (err) {
      console.error(err);
      alert('Create admin failed');
    }
  };

  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              CREATE NEW ADMIN
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <select
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Admin Email</option>
                  {emails?.map((email, index) => (
                    <option key={index} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role_id" className="block">
                  Role
                </label>
                <select
                  id="role_id"
                  name="role_id"
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
                  value={formData.role_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  {roles?.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
