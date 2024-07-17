import AuthUser from '@/components/Auth/authUser';
import React, { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthUser>{children}</AuthUser>;
}
