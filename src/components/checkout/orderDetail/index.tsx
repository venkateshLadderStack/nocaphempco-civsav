import React from 'react';

export default function OrderDetail() {
  return (
    <div className='mt-8 md:mt-0'>
      <h3 className='text-2.5xl leading-8 font-bold font-roboto mb-7'>
        Your order
      </h3>
      <div className='flex bg-input py-3 items-center'>
        <p className='w-full text-base font-heading font-bold text-mine pl-3'>
          Product
        </p>
        <p className='w-full text-base font-heading font-bold text-mine pl-3'>
          Subtotal
        </p>
      </div>
      <div className='flex bg-white py-3 items-center'>
        <p className='w-full text-base font-heading  text-mine pl-3'>
          Black Label - Ruby Kush - 14 Gram ×{' '}
          <span className='font-bold'>1</span>
        </p>
        <p className='w-full text-base font-heading text-mine pl-3'>$84.99</p>
      </div>
      <div className='flex bg-white py-3 items-center'>
        <p className='w-full text-base font-heading font-bold text-mine pl-3'>
          Subtotal
        </p>
        <p className='w-full text-base font-heading text-mine pl-3'>$84.99</p>
      </div>
      <div className='flex bg-input py-3 items-center'>
        <p className='w-full text-base font-heading font-bold text-mine pl-3'>
          Shipping
        </p>
        <div className='w-full'>
          <div>
            <input type='radio' name='shipping' className='outline-none' />
            <span className='text-base font-heading text-mine pl-2'>
              Free shpping
            </span>
          </div>
          <div>
            <input type='radio' name='shipping' className='outline-none' />
            <span className='text-base font-heading text-mine pl-2'>
              Ground Shipping: $3.99
            </span>
          </div>

          <div>
            <input type='radio' name='shipping' className='outline-none' />
            <span className='text-base font-heading text-mine pl-2'>
              Expedited 2-3 Day Shipping: $7.50
            </span>
          </div>
        </div>
      </div>
      <div className='flex bg-white py-3 items-center'>
        <p className='w-full text-base font-heading font-bold text-mine pl-3'>
          Tax
        </p>
        <p className='w-full text-base font-heading text-mine pl-3'>$0.00</p>
      </div>
      <div className='flex bg-input py-3 items-center'>
        <p className='w-full text-base font-bold font-heading font-bold text-mine pl-3'>
          Tax
        </p>
        <p className='w-full text-base font-heading font-bold text-mine pl-3'>
          $84.99
        </p>
      </div>
    </div>
  );
}
