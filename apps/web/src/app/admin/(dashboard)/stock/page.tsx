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
import { deleteStock, getStock } from '@/services/stock.service';
import api from '@/api/apiApp';

// interface Product {
//   id: number,
//   admin_id: number
//   name: string
//   description: string
//   price: number
//   category_id: number
//   image: string
// }

const Page = () => {
  const [data, setData] = useState({
    stock: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    name: '',
    page: 1,
    pageSize: 10,
  });

  const router = useRouter();

  // const [products, setProducts] = useState<Product[]>([])
  // const getListProduct = async ()=> {
  //   try {
  //     const result = await api.get('/api/product/')
  //     setProducts(result.data.data)
  //     console.log(setProducts)
  //   } catch (err) {
  //     console.log('failed to fetch product', err)
  //   }
  // }
  
  // useEffect(()=> {
  //   getListProduct
  // },[])

  useEffect(() => {
    (async () => {
      const result = await getStock(filters);
      setData(result);
    })();
  }, [filters]);

  const handleDelete = async (id: number, product_id: number) => {
    if (!confirm(`Are you sure want to delete product ${product_id}?`) || !id) return;
    try {
      const product = await deleteStock(id);
      if (!product) throw new Error('Delete product failed');
      alert('Delete product success');

      const result = await getStock(filters);
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
                Stock
                <a className="text-accentDark"> Management</a>
              </h1>
            </div>
            <div className=" md:justify-self-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-accentDark hover:bg-accent rounded"
                onClick={() => {
                  router.push('/admin/stock/create');
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
                    Store_id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Product_id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.stock?.map((stock: any, index: number) => (
                  <tr key={stock.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {filters.pageSize * (filters.page - 1) + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stock.store?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.product?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stock.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stock.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="bg-accentDark hover:bg-accent text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            router.push(`/admin/stock/edit/${stock.id}`);
                          }}
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="bg-cheeryred hover:bg-[#ff2b2bec] text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(stock.id, stock.product_id)}
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
