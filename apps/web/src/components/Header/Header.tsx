'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBasketShopping } from 'react-icons/fa6';
import Container from '../Container';
import UserMenu from './UserMenu';
import SubHeader from './SubHeader';
import { useAppSelector } from '@/lib/hooks';

export const Header = () => {
  const [dataToken, setDataToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setDataToken(token ?? '');
  }, [dataToken]);

  const cart = useAppSelector((state) => state.cart);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="sticky top-0 w-full bg-white z-30 shadow-sm ">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex justify-between items-center pt-5 py-5">
            {/* LOGO SECTION */}
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={150} height={100} />
            </Link>
            {/* MENU SECTION */}
            <div className="flex items-center ">
              <Link href={'/cart'}>
                <div className="relative">
                  <button className="mr-4">
                    <FaBasketShopping size={25} />
                    {hasMounted && cart.itemsCount > 0 && (
                      <span className="absolute top-2 right-4 w-5 h-5 bg-accentDark text-white flex justify-center items-center rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {cart.itemsCount}
                      </span>
                    )}
                  </button>
                </div>
              </Link>
              <div className="w-px h-6 bg-gray-400 mr-4"></div>
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
      {dataToken && <SubHeader />}
    </div>
  );
};
