import React, { Fragment } from 'react';
import CartItem from './cartItem';
import Button from '@/components/global/button';

const list = [1, 2, 3, 4, 5];

export default function Summary() {
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold text-mine font-heading'>
        Cart Summary
      </h1>
      <p className='mt-6 mb-1 text-2xl font-medium text-mine font-heading'>
        Congratulations, your order qualifies for free shipping!
      </p>
      <div className='flex items-center py-3 bg-input'>
        <p className='w-3/5 pl-3 text-base font-bold text-center font-heading text-mine'>
          Product
        </p>
        <p className='w-40 pl-3 text-base font-bold text-center xs:w-20 font-heading text-mine xs:hidden'>
          Price
        </p>
        <p className='w-40 pl-3 text-base font-bold text-center xs:w-20 font-heading text-mine'>
          Quantity
        </p>
        <p className='w-40 pl-3 text-base font-bold text-center xs:w-20 font-heading text-mine'>
          Subtotal
        </p>
      </div>
      {/* cart items */}
      {list.map((item, index) => (
        <Fragment key={item}>
          <CartItem isBackground={index % 2 === 0 ? false : true} />
        </Fragment>
      ))}
      {/* End */}
      <div
        className={`flex xs:flex-col xs:items-start items-center py-2 xs:space-x-0 xs:pl-2 xs:space-y-3 space-x-2 ${
          list.length % 2 !== 0 ? 'bg-alabaster' : 'bg-white'
        }`}
      >
        <input
          type='text'
          placeholder='Coupon code'
          className={`bg-input outline-none font-heading focus-within:bg-gray-100 leading-5 p-2.5 border-l-2`}
        />
        <Button type='button' title='Apply coupon' size='small' />
        <Button type='button' title='Continue Shopping' size='small' />
      </div>
    </div>
  );
}
