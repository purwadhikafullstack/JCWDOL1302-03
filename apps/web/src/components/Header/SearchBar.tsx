'use client';

import api from '@/api/apiApp';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const [data, setData] = useState<any>([]);
  const [name, setName] = useState<string>('');

  const getProduct = async () => {
    try {
      const result = await api.get(
        `/product?name=${name}&page=1&pageSize=1000`,
      );
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const debounced = useDebouncedCallback((value) => {
    setName(value); // Update the search state
    getProduct(); // Trigger the getProduct function
  }, 2000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        autoComplete="off"
        type="search"
        placeholder="Search the product..."
        className=" border border-gray-300 focus:outline-none focus:border-[0.5px] focus:border-[#0a6406] px-6 py-3 rounded-[300px] w-full text-sm"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
