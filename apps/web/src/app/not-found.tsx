import Container from '@/components/Container';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl mb-4">404 - Page Not Found</h1>
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={100}
              className="mx-auto mb-4"
            />
            <p>The Page you are looking for is not found</p>
            <p>or your account is unauthorized to visit</p>
          </div>
        </div>
      </Container>
    </>
  );
}
