import React from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  isBackground: boolean;
}
export default function CartItem({ isBackground }: Props) {
  return (
    <div
      className={`flex py-4 items-center ${
        isBackground ? 'bg-alabaster' : 'bg-white'
      }`}
    >
      <div className='flex items-center w-3/5 space-x-4'>
        <div className='border p-0.5 rounded border-red-600 text-red-600 hover:bg-red-600 hover:text-white items-center cursor-pointer'>
          <AiOutlineClose size={14} />
        </div>
        <div className='relative'>
          <Image
            src='https://nocaphempco.com/wp-content/uploads/2020/12/No-Cap-Hemp-Co-Berry-White-Joint-480x480.jpg'
            alt='title'
            height={60}
            width={60}
          />
        </div>
        <p>Black Label - Ruby Kush - 14 Gram</p>
      </div>

      <p className='w-40 pl-3 text-base text-center font-heading text-mine xs:hidden '>$84.99</p>
      <div className='w-40 pl-3 text-center xs:w-20 '>
        <input
          type='number'
          className='h-10 pl-2 outline-none w-14 bg-input'
          min={1}
        />
      </div>
      <p className='w-40 pl-3 text-base text-center xs:w-20 font-heading text-mine '>$169.98</p>
    </div>
  );
}
