import React from 'react';
import Button from '../global/button';
import Input from '../global/input2';

export default function Form() {
  return (
    <div className='flex p-14 bg-banner'>
      <div className='w-full flex justify-center flex-col items-center'>
        <div
          className='p-[280px] w-full bg-contain bg-center'
          style={{
            backgroundImage: `url(${process.env.API_URL}/wp-content/uploads/2021/09/Forbes4.jpg)`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <h2 className='font-bold text-2.5xl mt-10 text-mine font-heading text-center'>
          Distribute our Award winning hemp products.
        </h2>
        <p className='text-base text-mine my-3'>
          For all enquiries please contact us:
        </p>
        <div className='flex space-x-3 mt-4'>
          <Button type='button' title='954-928-8161' size='small' />
          <Button type='button' title='Email Us' size='small' />
        </div>
      </div>
      <div className='w-3/4 my-4'>
        <div className='w-2/3'>
          <div className='flex space-x-6 items-center'>
            <Input type='text' lable='Name' required />
            <Input type='text' />
          </div>
          <div className='flex space-x-6 items-center -mt-4'>
            <p className='w-full text-sm'>Frist</p>
            <p className='w-full text-sm'>Last</p>
          </div>
          <Input type='text' lable='Email' required />
          <Input type='number' lable='Phone number' required />
          <Input type='text' lable='Company' required />
          <Input type='text' lable='Tax ID' />
          <Input
            type='text'
            lable='What products are you interested in?'
            textArea={true}
            required
          />
          <button
            type='button'
            className='font-bold font-heading text-base bg-input border border-gray-300 py-2 px-4'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
