import React, { useState } from 'react';
import Select from 'react-select';
import Button from '@/components/global/button';
import Input from '@/components/global/input';
const options = [{ value: 'us', label: 'United State (US)' }];

const options2 = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'california', label: 'California' },
];
export default function Total({ total }: any) {
  const [show, setShow] = useState(false);

  const _toggle = () => {
    setShow(!show);
  };

  return (
    <div className='w-full lg:w-2/5'>
      <h1 className='text-3xl font-bold text-mine font-heading'>Cart Total</h1>
      <p className='mt-6 text-base text-mine'>
        <span className='mr-3 font-bold'>Subtotal</span> ${total?.toFixed(2)}
      </p>

      <div className='flex items-center px-3 py-3 mt-2 bg-alabaster'>
        <p className='pr-3 text-base font-bold font-heading text-mine'>
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
          <p className='mt-3 text-base text-mine'>
            Shipping to
            <span className='font-bold'> California, United State</span>
          </p>
          <p
            className='mt-1 text-base font-normal cursor-pointer text-primary'
            onClick={_toggle}
          >
            Calculate shipping
          </p>
          <div
            className={`h-auto mt-1 space-y-1 collapse overflow-hidden ${
              show ? 'max-h-60' : 'max-h-0'
            }`}
          >
            <Select options={options} placeholder='Select a country / region' />
            <Select options={options2} placeholder='State / Country' />
            <Input type='text' placeholder='City' />
            <Input type='text' placeholder='Postcode / ZIP' />
            <div className='pt-4 pb-2'>
              <Button title=' Update ' type='button' size='small' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center p-3'>
        <p className='w-20 text-base font-bold text-mine'>Tax</p>
        <p className='text-base text-mine'>$0.00</p>
      </div>
      <div className='flex items-center p-3 mb-2 bg-alabaster'>
        <p className='w-20 text-base font-bold text-mine'>Total</p>
        <p className='text-base font-bold text-mine'>${total?.toFixed(2)}</p>
      </div>
      <div className='flex justify-end'>
        <Button
          type='internalLink'
          path='/checkout'
          title='Proceed to checkout'
          size='small'
        />
      </div>
    </div>
  );
}
