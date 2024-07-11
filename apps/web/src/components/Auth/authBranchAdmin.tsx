'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import {
  checkAdminToken,
  logoutAdmin,
} from '@/lib/features/auth/adminAuthSlice';
import { useRouter } from 'next/navigation';

export default function AuthBranchAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/');

        const result = await dispatch(checkAdminToken(token));
        if (!result) {
          dispatch(logoutAdmin());
          router.push('/404');
        }

        if (result.role_id !== 2) {
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
