import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/global/button';
import Input from '@/components/global/input';

// const renderAttributes = (value: any) => {
//   const keys: string[] = [];
//   value.forEach((i: any) => {
//     keys.push(Object.keys(i).toString());
//   });

//   return value.map((i: any, index: number) => {
//     return (
//       <span key={index} className='text-sm'>
//         {' '}
//         <span className='font-bold'>{i[keys[index]].label}</span>:{'  '}
//         {i[keys[index]].option}
//       </span>
//     );
//   });
// };

export default function OrderDetail({
  list,
  total,
  free,
  tax,
  shippingType,
  loading,
  setShippingType,
  shippingClass,
  onClick,
}: any) {
  const [localTotal, setLocalTotal] = useState(0);

  useEffect(() => {
    let t = 0;

    if (shippingType === 'free') {
      t = parseFloat(tax) + parseFloat(total);
    } else if (shippingType === 'ground') {
      t =
        parseFloat(tax) + parseFloat(total) + parseFloat(shippingClass?.ground);
    } else {
      t =
        parseFloat(tax) +
        parseFloat(total) +
        parseFloat(shippingClass?.expedited);
    }
    setLocalTotal(t);
  }, [total, shippingClass, tax]);

  // select shipping type
  const _selectRadio = (arg: string) => {
    let t = 0;

    setShippingType(arg);
    if (arg === 'free') {
      t = parseFloat(tax) + parseFloat(total);
    } else if (arg === 'ground') {
      t =
        parseFloat(tax) + parseFloat(total) + parseFloat(shippingClass?.ground);
    } else {
      t =
        parseFloat(tax) +
        parseFloat(total) +
        parseFloat(shippingClass?.expedited);
    }
    setLocalTotal(t);
  };

  return (
    <div className='mt-8 md:mt-0 font-heading'>
      <h3 className='text-2xl leading-8 font-bold font-roboto mb-7'></h3>
      {/* <div className='flex items-center py-3 bg-input'>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Product
        </p>
        <p className='w-full pl-3 text-base font-bold font-heading text-mine'>
          Subtotal
        </p>
      </div> */}
      {list.map((item: any, index: number) => {
        return (
          <div className='flex flex-row items-center' key={index}>
            <div className='w-30 relative'>
              <Image
                src={item?.image}
                alt=''
                layout='fixed'
                width={74}
                height={74}
                className='rounded'
              />
              <div className='notification_badge'>{item?.quantity}</div>
            </div>
            <div className='pl-4 flex-1 text-sm font-medium text'>
              {item?.name}
            </div>
            <div className='pl-4 w-20 text-sm font-medium'>${item?.price}</div>
          </div>
        );
      })}
      <hr className='mb-4' />
      <div className='flex items-center'>
        <div className='w-full pr-4'>
          <Input placeholder='Discount Code' />
        </div>
        <button className='mr-1 w-1/4 sm:h-11 flex items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-black xs:h-12 xs:w-1/3'>
          Apply
        </button>
      </div>
      <hr className='my-4' />
      <div className='flex items-center py-3'>
        <p className='w-full  pl-3 text-base font-light font-heading text-mine '>
          Subtotal
        </p>
        <p className='w-full pl-3 text-base font-heading text-mine'>${total}</p>
      </div>
      <div className='flex items-center py-3'>
        <p className='w-full pl-3 text-base font-heading text-mine'>Shipping</p>
        <div className='w-full'>
          {free > 50 && (
            <div>
              <input
                type='radio'
                name='shipping'
                value='free'
                defaultChecked={shippingType === 'free'}
                className='outline-none'
                onClick={() => _selectRadio('free')}
              />
              <span className='pl-2 text-base font-heading text-mine'>
                Free shpping
              </span>
            </div>
          )}
          <div>
            <input
              type='radio'
              name='shipping'
              value='ground'
              defaultChecked={shippingType === 'ground'}
              className='outline-none'
              onClick={() => _selectRadio('ground')}
            />
            <span className='pl-2 text-base font-heading text-mine'>
              Ground Shipping: $
              {shippingClass?.ground ? shippingClass.ground : 0}
            </span>
          </div>

          <div>
            <input
              type='radio'
              name='shipping'
              value='expedited'
              defaultChecked={shippingType === 'expedited'}
              className='outline-none'
              onClick={() => _selectRadio('expedited')}
            />
            <span className='pl-2 text-base font-heading text-mine'>
              Expedited 2-3 Day Shipping: $
              {shippingClass?.expedited ? shippingClass.expedited : 0}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center py-3'>
        <p className='w-full pl-3 text-base  font-heading text-mine'>Tax</p>
        <p className='w-full pl-3 text-base  font-heading text-mine'>
          ${tax.toFixed(2)}
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex items-center py-3'>
        <p className='w-full pl-3 text-base font-heading text-mine'>Total</p>
        <p className='w-full pl-3 font-medium text-2xl'>
          <span className='font-extralight text-sm mr-2'>USD</span> $
          {localTotal.toFixed(2)}
        </p>
      </div>
      <div className='mt-6'>
        <p>Pay securely using your credit card.</p>
        <div id='card-container'></div>
        <p className='font-heading mt-4'>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{' '}
          <Link href='/privacy-policy'>
            <a className='text-primary'>privacy policy</a>
          </Link>
          .
        </p>
        <br />
        {/* <Button
          type='button'
          size='small'
          title={loading ? 'Loading...' : 'Place Order'}
          id='card-button'
          onClick={onClick}
          disable={loading}
        /> */}
      </div>
    </div>
  );
}
