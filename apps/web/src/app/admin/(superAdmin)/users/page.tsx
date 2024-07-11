'use client';

import Container from '@/components/Container';
import { getAllUser } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

const Page = () => {
  const [data, setData] = useState({
    users: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    email: '',
    page: 1,
    pageSize: 10,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getAllUser(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <>
      <Container>
        <div className="mt-10">
          <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                User
                <a className="text-accentDark"> Management</a>
              </h1>
            </div>
            <div className=" md:justify-self-end space-x-2">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-accentDark hover:bg-accent rounded"
                onClick={() => {
                  router.push('/admin/admins');
                }}
              >
                Create Admin
              </button>
            </div>
          </div>
        </div>
        <div>
          <input
            placeholder="Search email..."
            className="border border-gray-300 focus:outline-none focus:border-[0.5px] focus:border-[#0a6406] px-6 py-3 rounded-[300px] w-full text-sm"
            value={filters.email}
            onChange={(e) =>
              setFilters({ ...filters, email: e.target.value, page: 1 })
            }
          />
        </div>
        <div className="mt-5 flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white">
              <thead className="bg-accent">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Birth Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Verified
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.users?.map((user: any, index: number) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {filters.pageSize * (filters.page - 1) + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.birthDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.verified ? 'Verified' : 'Not Verified'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-4 flex justify-between items-center">
            <div className="flex-1 flex justify-center items-center space-x-2">
              <button
                className="p-2"
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: Math.max(prevFilters.page - 1, 1),
                  }))
                }
                disabled={filters.page === 1}
              >
                <FaArrowCircleLeft className="text-accentDark h-5 w-5" />
              </button>
              <div className="p-2 text-accentDark">
                {filters.page} / {data.pages}
              </div>
              <button
                className="p-2"
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: Math.min(prevFilters.page + 1, data.pages),
                  }))
                }
                disabled={filters.page === data.pages}
              >
                <FaArrowCircleRight className="text-accentDark h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <select
                className="p-2 border rounded"
                value={filters.pageSize}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    pageSize: parseInt(e.target.value),
                    page: 1,
                  })
                }
              >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
              </select>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page;
