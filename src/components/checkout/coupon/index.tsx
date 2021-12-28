import React, { useState } from 'react';
import Input from '@/components/global/input';
import Button from '@/components/global/button';

export default function Coupon() {
  const [show, setShow] = useState(false);
  const _toggle = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className='p-4 border-l-8 bg-primary border-tuscany'>
        <p className='text-base font-normal leading-normal text-white font-heading'>
          Have a coupon?&nbsp;&nbsp;
          <span
            onClick={_toggle}
            className='pb-1 border-b border-white border-opacity-50 cursor-pointer xs:max-w-max xs:block hover:border-opacity-100 hover:border-b-2'
          >
            Click here to enter your code
          </span>
        </p>
      </div>
      <div
        className={`overflow-hidden h-auto mt-8 mb-6 collapse ${
          show ? 'max-h-32' : 'max-h-0'
        }`}
      >
        <p className='text-base text-mine'>
          If you have a coupon code, please apply it below.
        </p>
        <div className='flex items-center space-x-4'>
          <div className='w-full'>
            <Input placeholder='Coupon code' />
          </div>
          <div className='w-full '>
            <Button type='button' title='Apply coupon' size='small' />
          </div>
        </div>
      </div>
    </div>
  );
}
