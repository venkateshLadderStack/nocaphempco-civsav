import React, { useState } from 'react';
import Select from 'react-select';
import Input from '@/components/global/input';

const options = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'california', label: 'California' },
];

export default function BillingDetail() {
  const [differentAddress, setDifferentAddress] = useState(false);
  return (
    <>
      <h3 className='text-2.5xl leading-8 font-bold font-roboto'>
        Billing details
      </h3>
      <div className='flex justify-between space-x-6'>
        <Input type='text' lable='First name *' />
        <Input lable='Last name *' />
      </div>
      <Input lable='Company name (optional)' />
      <p className='text-base text-mine font-heading mt-4 mb-1'>
        Country / Region *
      </p>
      <p className='text-base font-bold text-mine mb-4'>United State (US)</p>
      <Input
        lable='Street address *'
        placeholder='House number and street name'
      />
      <div className='mt-6'>
        <Input placeholder='Apartment, suite, unit etc. (optional)' />
      </div>
      <Input lable='Town and city *' />
      <p className='text-base text-mine font-heading'>State / country * </p>
      <Select options={options} />
      <Input lable='Postcode / Zip *' />
      <Input lable='Phone *' />
      <Input lable='Email address *' />
      {/* checkbox */}
      <input type='checkbox' />
      <span className='font-heading text-base text-mine'>
        &nbsp; Subscribe to our newsletter
      </span>
      <div className='mt-7'>
        <input
          type='checkbox'
          onClick={() => setDifferentAddress(!differentAddress)}
        />
        <span className='font-heading text-lg lg:text-2.5xl font-bold text-mine'>
          &nbsp; Ship to a different address?
        </span>
      </div>
      {differentAddress && (
        <div>
          <div className='flex justify-between space-x-6'>
            <Input lable='First name *' />
            <Input lable='Last name *' />
          </div>
          <Input lable='Company name (optional)' />
          <p className='text-base text-mine font-heading mt-4 mb-1'>
            Country / Region *
          </p>
          <p className='text-base font-bold text-mine mb-4'>
            United State (US)
          </p>
          <Input
            lable='Street address *'
            placeholder='House number and street name'
          />
          <div className='mt-6'>
            <Input placeholder='Apartment, suite, unit etc. (optional)' />
          </div>
          <Input lable='Town and city *' />
          <p className='text-base text-mine font-heading'>State / country * </p>
          <Select options={options} />
          <Input lable='Postcode / Zip *' />
          <Input lable='Phone (optional)' />
        </div>
      )}
      <p className='text-base text-mine font-heading'>Order notes (optional)</p>
      <textarea className='bg-input w-full outline-none font-heading focus-within:bg-gray-100 mt-1 p-2'></textarea>
    </>
  );
}
