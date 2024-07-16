'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { GoTrash } from 'react-icons/go';
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaRegEdit,
} from 'react-icons/fa';
import { deleteProduct, getProducts } from '@/services/prouduct.service';

const Page = () => {
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    name: '',
    page: 1,
    pageSize: 10,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getProducts(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure want to delete product ${name}?`) || !id) return;
    try {
      const product = await deleteProduct(id);
      if (!product) throw new Error('Delete product failed');
      alert('Delete product success');

      const result = await getProducts(filters);
      setData(result);
    } catch (err) {
      console.error(err);
      alert('Delete product failed');
    }
  };

  return (
    <>
      <Container>
        <div className="mt-10">
          <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                Product
                <a className="text-accentDark"> Management</a>
              </h1>
            </div>
            <div className=" mt-4 md:justify-self-end space-x-2">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-cheeryyellow hover:bg-yellow-600 rounded"
                onClick={() => {
                  router.push('/admin/adminDashboard');
                }}
              >
                Admin Dashboard
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-cheeryyellow hover:bg-yellow-600 rounded"
                onClick={() => {
                  router.push('/admin/products');
                }}
              >
                Admin Product List
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-accentDark hover:bg-accent rounded"
                onClick={() => {
                  router.push('/admin/product/create');
                }}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
        <div>
          <input
            placeholder="Search product..."
            className="border border-gray-300 focus:outline-none focus:border-[0.5px] focus:border-[#0a6406] px-6 py-3 rounded-[300px] w-full text-sm"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value, page: 1 })
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
                    admin id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.products?.map((product: any, index: number) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {filters.pageSize * (filters.page - 1) + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.admin_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="bg-accentDark hover:bg-accent text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            router.push(`/admin/product/edit/${product.id}`);
                          }}
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="bg-cheeryred hover:bg-[#ff2b2bec] text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <GoTrash />
                        </button>
                      </div>
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
