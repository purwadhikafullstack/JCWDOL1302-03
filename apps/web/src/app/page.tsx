'use client';
import Hero from '@/components/Hero/Hero';
import Container from '@/components/Container';
import ProductCard from '@/components/Products/ProductCard';
// import { products } from './utils/products';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getProducts } from '@/services/prouduct.service';
import GeoLocation from '@/components/Header/GeoLocation';

export default function Home() {
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    name: '',
    page: 1,
    pageSize: 12,
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
        <GeoLocation />
        <div>
          <Hero />
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                Browse
                <a className="text-accentDark"> our Products</a>
              </h1>
            </div>
            <div className=" md:justify-self-end">
              <Link href={'/products'}>
                <button className="outline text-accentDark text-sm font-semibold p-3 border rounded-full hover:text-accent">
                  Browse all products
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {data.products?.map((product: any) => {
              return <ProductCard key={product.id} data={product} />;
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
