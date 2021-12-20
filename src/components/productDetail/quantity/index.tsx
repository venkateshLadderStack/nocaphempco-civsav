import React, { Fragment } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';

interface Props {
  qty: number;
  increment: () => void;
  decrement: () => void;
}

export default function Quantity({ qty, increment, decrement }: Props) {
  return (
    <Fragment>
      <div>
        <label className='text-lg font-bold leading-10 font-heading text-scorpion'>
          Quantity
        </label>
        <div className='flex items-center w-full px-2 py-3 mt-2 border rounded border-primary max-w-max text-primary space-x-7'>
          <button
            className='bg-transparent border-none outline-none'
            onClick={increment}
          >
            <IoIosAdd size={26} />
          </button>
          <span>{qty}</span>
          <button
            className='bg-transparent border-none outline-none'
            onClick={decrement}
          >
            <FiMinus size={22} />
          </button>
        </div>
      </div>
    </Fragment>
  );
}
