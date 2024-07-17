import Container from '@/components/Container';
import Image from 'next/image';

export default function Verify() {
  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Thank You for Registering</h1>
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={100}
              className="mx-auto mb-4"
            />
            <p>Before you login into Cheery Fresh,</p>
            <p>Please check your email to verify your account!</p>
          </div>
        </div>
      </Container>
    </>
  );
}
