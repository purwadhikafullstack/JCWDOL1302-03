import AuthSuperAdmin from '@/components/Auth/authSuperAdmin';
import React, { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthSuperAdmin>{children}</AuthSuperAdmin>;
}
