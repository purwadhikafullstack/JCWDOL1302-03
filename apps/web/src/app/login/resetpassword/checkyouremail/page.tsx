import Container from '@/components/Container';
import Image from 'next/image';

export default function CheckYourEmailPage() {
  return (
    <>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Requesting Reset Password</h1>
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={100}
              className="mx-auto mb-4"
            />
            <p>Before you reset password,</p>
            <p>Please check your email to confirm your identity!</p>
          </div>
        </div>
      </Container>
    </>
  );
}
