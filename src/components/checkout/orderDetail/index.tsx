import React from 'react';
import Link from 'next/link'

export default function OrderDetail() {
  return (
    <div className='mt-8 md:mt-0 font-heading'>
      <h3 className='text-2.5xl leading-8 font-bold font-roboto mb-7'>
        Your order
      </h3>
      <div className='flex items-center py-3 bg-input'>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Product
        </p>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Subtotal
        </p>
      </div>
      <div className='flex items-center py-3 bg-white'>
        <p className='w-full pl-3 text-base font-heading text-mine'>
          Black Label - Ruby Kush - 14 Gram ×{' '}
          <span className='font-bold'>1</span>
        </p>
        <p className='w-full pl-3 text-base font-heading text-mine'>$84.99</p>
      </div>
      <div className='flex items-center py-3 bg-white'>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Subtotal
        </p>
        <p className='w-full pl-3 text-base font-heading text-mine'>$84.99</p>
      </div>
      <div className='flex items-center py-3 bg-input'>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Shipping
        </p>
        <div className='w-full'>
          <div>
            <input type='radio' name='shipping' className='outline-none' />
            <span className='pl-2 text-base font-heading text-mine'>
              Free shpping
            </span>
          </div>
          <div>
            <input type='radio' name='shipping' className='outline-none' />
            <span className='pl-2 text-base font-heading text-mine'>
              Ground Shipping: $3.99
            </span>
          </div>

          <div>
            <input type='radio' name='shipping' className='outline-none' />
            <span className='pl-2 text-base font-heading text-mine'>
              Expedited 2-3 Day Shipping: $7.50
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center py-3 bg-white'>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Tax
        </p>
        <p className='w-full pl-3 text-base font-heading text-mine'>$0.00</p>
      </div>
      <div className='flex items-center py-3 bg-input'>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Tax
        </p>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          $84.99
        </p>
      </div>
      <div className='mt-6'>
        <p className='font-heading'>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our <Link href='/privacy-policy'><a className='text-primary'>privacy policy</a></Link>.
        </p>
      </div>
    </div>
  );
}
