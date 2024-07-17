import AuthAllAdmin from '@/components/Auth/authAllAdmin';
import React, { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthAllAdmin>{children}</AuthAllAdmin>;
}
