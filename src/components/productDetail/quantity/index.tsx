import React, { Fragment } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';

export default function Quantity() {
  return (
    <Fragment>
      <div>
        <label className='text-lg font-bold leading-10 font-heading text-scorpion'>
          Quantity
        </label>
        <div className='flex items-center w-full px-2 py-3 mt-2 border rounded border-primary max-w-max text-primary space-x-7'>
          <button className='bg-transparent border-none outline-none'>
            <IoIosAdd size={26} />
          </button>
          <span>1</span>
          <button className='bg-transparent border-none outline-none'>
            <FiMinus size={22} />
          </button>
        </div>
      </div>
    </Fragment>
  );
}
