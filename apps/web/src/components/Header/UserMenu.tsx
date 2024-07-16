'use client';

import { useCallback, useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import { IoPersonSharp } from 'react-icons/io5';
import MenuItem from './MenuItem';
import BackDrop from './BackDrop';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-accentDark flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-accentDark"
        >
          <IoPersonSharp size={25} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer font-bold">
            {status.isLogin ? (
              <div>
                <Link href="/">
                  <MenuItem onClick={toggleOpen}> Home</MenuItem>
                </Link>
                <Link href="/products">
                  <MenuItem onClick={toggleOpen}> Products</MenuItem>
                </Link>
                {/* <Link href={`/user/update`}>
                  <MenuItem onClick={toggleOpen}> My Profil</MenuItem>
                </Link> */}
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}> My Orders</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    localStorage.clear();
                    router.push('/');
                  }}
                >
                  Log Out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/">
                  <MenuItem onClick={toggleOpen}> Home</MenuItem>
                </Link>
                <Link href="/products">
                  <MenuItem onClick={toggleOpen}> Products</MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}> Log In</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}> Register</MenuItem>
                </Link>
                <Link href="/login/admin">
                  <MenuItem onClick={toggleOpen}> As Admin</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
