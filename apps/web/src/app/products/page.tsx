'use client';
import Container from '@/components/Container';
import ProductCard from '@/components/Products/ProductCard';
import { getProducts } from '@/services/prouduct.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

const ProductsList = () => {
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    name: '',
    page: 1,
    pageSize: 30,
  });

  useEffect(() => {
    (async () => {
      const result = await getProducts(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <>
      <Container>
        <div className="mt-20">
          <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                Browse
                <a className="text-accentDark"> our Products</a>
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {data.products?.map((product: any) => {
              return <ProductCard key={product.id} data={product} />;
            })}
          </div>
          <div className="mt-10 flex-1 flex justify-center items-center space-x-2">
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
        </div>
      </Container>
    </>
  );
};

export default ProductsList;
