'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { checkToken, signOut } from '@/lib/features/auth/authSlice';

export default function AuthUser({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');
        if (!token) {
          alert(
            'You are not logged in. Please register or log in to access this page!',
          );
          return router.push('/');
        }

        const result = await dispatch(checkToken(token));
        if (!result) {
          // dispatch(signOut());
          router.push('/404');
        }

        if (result.role !== 'User') {
          router.push('/404');
        } else {
          setIsLoading(false);
        }
      }
    })();
  }, [dispatch, router]);

  if (isLoading) return <>Data Loading, please wait!</>;

  return <>{children}</>;
}
