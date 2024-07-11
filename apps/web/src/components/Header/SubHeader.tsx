'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TbBrandGoogleMaps } from 'react-icons/tb';
import Container from '../Container';

const SubHeader = () => {
    const [newCity, setNewCity] = useState(localStorage.getItem('city'))

    useEffect(() => {
        console.log("here is new city",newCity)
      }, [localStorage.getItem("city")]) 

  return (
    <>
      <Container>
        <div className="flex justify-end p-4">
          <Link
            href="/address"
            className="flex items-center space-x-2 hover:text-accent"
            style={{ color: '#0a6406' }}
          >
            <TbBrandGoogleMaps />
            <span>Dikirim ke {newCity}</span>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default SubHeader;
