import Image from 'next/image';
import React from 'react';

interface propsType {
  img: string;
}

const Slide: React.FC<propsType> = ({ img }) => {
  return (
    <div className="outline-none border-none relative">
      <div>
        <Image
          className="w-full md:h-auto rounded-xl"
          src={img}
          alt="banner"
          width={2000}
          height={2000}
        />
      </div>
    </div>
  );
};

export default Slide;
