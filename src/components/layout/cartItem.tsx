import React from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  isBackground: boolean;
}
export default function CartItem({ isBackground }: Props) {
  return (
    <div
      className={`flex py-1 items-center ${
        isBackground ? 'bg-alabaster' : 'bg-white'
      }`}
    >
      <div className='flex items-center space-x-2 px-2'>
        <div className='border p-0.5 rounded border-red-600 text-red-600 hover:bg-red-600 hover:text-white items-center cursor-pointer'>
          <AiOutlineClose size={14} />
        </div>
        <div className='relative'>
          <Image
            src='https://nocaphempco.com/wp-content/uploads/2020/12/No-Cap-Hemp-Co-Berry-White-Joint-480x480.jpg'
            alt='title'
            height={50}
            width={50}
          />
        </div>
        <p className='text-sm text-center font-heading text-mine'>
          Black Label - Ruby Kush - 14 Gram
        </p>
      </div>

      <p className='w-40 pl-2 text-xs text-center font-heading text-mine'>
        1 x $84.99
      </p>
    </div>
  );
}
