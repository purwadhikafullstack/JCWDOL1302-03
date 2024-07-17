import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header/Header';
import StoreProvider from './storeProvider';
import Auth from '../components/Auth/auth';
import { Footer } from '@/components/Footer/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthAllAdmin from '@/components/Auth/authAllAdmin';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cheery Fresh Shop',
  description: 'All Fresh Vegetables For You',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Auth>{children}</Auth>
            </main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
