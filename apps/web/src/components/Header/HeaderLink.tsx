'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderLinkProps } from './interfaceHeader';

export default function HeaderLink({ item }: HeaderLinkProps) {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      key={item.label}
      className={`" block lg:inline-block text-accentDark hover:text-accent dark:text-accentDark uppercase font-semibold relative group overflow-hidden "  ${
        pathName === item.path
      }`}
    >
      {item?.label}
      <span className="w-full h-[1px] bg-accentDark absolute inline-block left-0 bottom-0 -translate-x-[100%] " />
    </Link>
  );
}
