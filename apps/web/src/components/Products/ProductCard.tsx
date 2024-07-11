'use client';

import React from 'react';
import { formatRupiah } from '../../app/utils/formatRupiah';
import { truncateText } from '../../app/utils/truncateText';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-[#739802] bg-white rounded-lg p-2 transition hover:scale-105 text-center text-sm shadow-inner hover:shadow-xl"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={
              data.image.image
                ? process.env.NEXT_PUBLIC_BASE_PRUDUCT_IMAGE_URL +
                  data.image.image
                : '/default_img.jpg'
            }
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div className="font-semibold">{formatRupiah(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
