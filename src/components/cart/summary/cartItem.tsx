import React from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  isBackground: boolean;
  item: any;
  index: number;
  onChange: (arg: number, e: any) => void;
  removeItem: (arg: string) => void;
}
export default function CartItem({
  isBackground,
  item,
  index,
  onChange,
  removeItem,
}: Props) {
  return (
    <div
      className={`flex py-4 items-center ${
        isBackground ? 'bg-alabaster' : 'bg-white'
      }`}
    >
      <div className='flex items-center w-3/5 space-x-4'>
        <div
          className='border p-0.5 rounded border-red-600 text-red-600 hover:bg-red-600 hover:text-white items-center cursor-pointer'
          onClick={() => removeItem(item.product_id)}
        >
          <AiOutlineClose size={14} />
        </div>
        <div className='relative'>
          <Image src={item.image} alt='title' height={60} width={60} />
        </div>
        <p>{item.name}</p>
        <p>{}</p>
      </div>

      <p className='w-40 pl-3 text-base text-center font-heading text-mine xs:hidden '>
        ${item.price}
      </p>
      <div className='w-40 pl-3 text-center xs:w-20 '>
        <input
          type='number'
          className='h-10 pl-2 outline-none w-14 bg-input'
          min={1}
          value={item.quantity}
          onChange={(e) => onChange(index, e)}
        />
      </div>
      <p className='w-40 pl-3 text-base text-center xs:w-20 font-heading text-mine '>
        ${(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}
      </p>
    </div>
  );
}
