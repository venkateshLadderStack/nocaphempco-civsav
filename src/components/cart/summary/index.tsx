import React, { Fragment } from 'react';
import CartItem from './cartItem';
import Button from '@/components/global/button';
import Alert from '@/components/global/alert';

const Summary = ({ list, removeItem, onChangeProductQuantity, free }: any) => {
  // console.log(
  //   'Dalta 8',
  //   list.find((i) => i.name.toLowerCase().includes('delta 8'))
  // );

  return (
    <div className='w-full'>
      <h1 className='mb-4 text-3xl font-bold text-mine font-heading'>
        Cart Summary
      </h1>
      <div className='flex items-center py-3 bg-input'>
        <p className='w-3/6 pl-3 text-base font-bold text-center xs:w-3/5 font-heading text-mine'>
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
        <p className='hidden w-10 xs:block'></p>
      </div>
      {/* cart items */}
      {list.map((item: any, index: number) => (
        <Fragment key={index}>
          <CartItem
            isBackground={index % 2 === 0 ? false : true}
            item={item}
            onChange={onChangeProductQuantity}
            removeItem={removeItem}
            index={index}
          />
        </Fragment>
      ))}
      {/* End */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center py-2 space-x-0 pl-2 sm:pl-0 space-y-3 sm:space-y-0 sm:space-x-2 ${
          list.length % 2 !== 0 ? 'bg-alabaster' : 'bg-white'
        }`}
      >
        <input
          type='text'
          placeholder='Coupon code'
          className={`bg-input outline-none font-heading focus-within:bg-gray-100 leading-5 p-2.5 border-l-2`}
        />
        <Button type='button' title='Apply coupon' size='small' />
        <Button
          type='internalLink'
          path='/shop'
          title='Continue Shopping'
          size='small'
        />
      </div>
      <p className='mt-4 mb-4 text-2xl font-medium text-mine font-heading'>
        {free < 50
          ? `Add $${free?.toFixed(2)} to qualify for free shipping!`
          : 'Congratulations, your order qualifies for free shipping!'}
      </p>
      {list.find((i: any) => i.name.toLowerCase().includes('delta 8')) && (
        <Alert
          type='error'
          text='We do not ship Delta 8 products to Alaska, Arizona, Arkansas, Colorado, Delaware, Idaho, Kentucky, Mississippi, Montana, New York, Oregon, Rhode Island, Utah, Washington, or Vermont. Your order will be CANCELED if you try to order from these states.'
        />
      )}
    </div>
  );
};

export default Summary;
