import AuthBranchAdmin from '@/components/Auth/authBranchAdmin';
import React, { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthBranchAdmin>{children}</AuthBranchAdmin>;
}
