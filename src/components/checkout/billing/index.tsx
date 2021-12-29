import React, { useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Input from '@/components/global/input';
import { states } from '@/constant/states';

export default function BillingDetail({
  detail,
  setDetail,
  taxRates,
  shippingObject,
  setShippingObject,
}: any) {
  const [differentAddress, setDifferentAddress] = useState(false);

  const [state, setState] = useState(shippingObject.state);
  const [city, setCity] = useState<any>({
    value: shippingObject.city,
    isValid: shippingObject.city === '' ? null : true,
  });
  const [zipCode, setZip] = useState<any>({
    value: shippingObject.zip,
    isValid: shippingObject.zip === '' ? null : true,
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setDetail({
      ...detail,
      [evt.target.name]: {
        value: value,
        isValid: null,
      },
    });
  };
  // Handle blur to check valid or invalid
  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setDetail({
      ...detail,
      [evt.target.name]: {
        value: value,
        isValid: value === '' ? false : true,
      },
    });
  };

  const handleStates = (selectedOption: any) => {
    const filter = taxRates.edges.filter(
      (item: any) =>
        item.node.state === selectedOption.value &&
        item.node.postcode.includes(zipCode.value)
    );

    if (selectedOption.value === 'FL' && filter.length === 0) {
      toast.error('Postcode / ZIP does not match the selected state.');
    } else {
      let taxData = {};
      if (filter.length === 0) {
        taxData = {
          rate: 0,
          state: '',
          class: '',
        };
      } else {
        taxData = {
          rate: filter[0]?.node.rate,
          state: filter[0]?.node.state,
          class: filter[0]?.node.class,
        };
      }
      setShippingObject({
        ...shippingObject,
        state: selectedOption,
        tax: taxData,
      });
    }

    setState(selectedOption);
  };

  const handleCity = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setCity({
      value: value,
      isValid: null,
    });
    setShippingObject({
      ...shippingObject,
      city: value,
    });
  };

  const blurCity = (evt: React.FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setCity({
      ...city,
      isValid: value === '' ? false : true,
    });
  };

  const handleZip = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setZip({
      value: value,
      isValid: null,
    });
    setShippingObject({
      ...shippingObject,
      zip: value,
    });
  };

  const blurZip = (evt: React.FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setZip({
      ...zipCode,
      isValid: value === '' ? false : true,
    });
    if (state === null) {
      setShippingObject({
        ...shippingObject,
        zip: value,
      });
      return;
    }
    const filter = taxRates.edges.filter(
      (item: any) =>
        item.node.state === state.value && item.node.postcode.includes(value)
    );

    if (state.value === 'FL' && filter.length === 0) {
      toast.error('Postcode / ZIP does not match the selected state.');
    } else {
      let taxData = {};
      if (filter.length === 0) {
        taxData = {
          rate: 0,
          state: '',
          class: '',
        };
      } else {
        taxData = {
          rate: filter[0]?.node.rate,
          state: filter[0]?.node.state,
          class: filter[0]?.node.class,
        };
      }
      setShippingObject({
        ...shippingObject,
        zip: value,
        tax: taxData,
      });
    }
  };

  return (
    <div className='font-heading'>
      <h3 className='text-2xl leading-8 font-light font-roboto'>
        Contact Information
      </h3>
      <div className='flex justify-between space-x-4'>
        <Input
          placeholder='Email address'
          type='email'
          name='email'
          value={detail.email.value}
          isValid={detail.email.isValid}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      <div className='flex items-center mb-10'>
        <input type='checkbox' className='w-5 h-5 p-1' />
        <span className='text-base font-heading text-mine'>
          &nbsp; Email me with news and offers
        </span>
      </div>
      <h3 className='text-2xl leading-8 font-light font-roboto'>
        Shipping Address
      </h3>
      <div className='sm:flex sm:justify-between sm:space-x-4'>
        <div className='mt-4 sm:flex-1'>
          <Input
            type='text'
            placeholder='First Name'
            name='firstName'
            value={detail.firstName.value}
            isValid={detail.firstName.isValid}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className='mt-4 sm:flex-1'>
          <Input
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={detail.lastName.value}
            isValid={detail.lastName.isValid}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='mt-4'>
        <Input
          type='text'
          placeholder='Company name (optional)'
          name='company'
          value={detail.company.value}
          onChange={handleChange}
        />
      </div>

      <div className='mt-4'>
        <Input
          placeholder='Address'
          type='text'
          name='street'
          value={detail.street.value}
          isValid={detail.street.isValid}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className='mt-4'>
        <Input
          placeholder='Apartment, suite, unit etc. (optional)'
          type='text'
          name='apartment'
          value={detail.apartment.value}
          onChange={handleChange}
        />
      </div>
      <div className='mt-4'>
        <Input
          type='text'
          placeholder='City'
          value={city.value}
          isValid={city.isValid}
          onChange={handleCity}
          onBlur={blurCity}
        />
      </div>

      <div className='sm:flex sm:justify-between sm:space-x-4 sm:items-center'>
        <div className='flex-1 border border-transparent rounded-md'>
          <Select
            options={states}
            value={state}
            onChange={handleStates}
            placeholder='State / Country'
          />
        </div>

        <div className='flex-1'>
          <Input
            placeholder='Postcode / Zip'
            value={zipCode.value}
            isValid={zipCode.isValid}
            onChange={handleZip}
            onBlur={blurZip}
          />
        </div>
      </div>

      <Input
        placeholder='Phone'
        type='number'
        name='phone'
        value={detail.phone.value}
        isValid={detail.phone.isValid}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {/* checkbox */}
      {/* <input type='checkbox' />
      <span className='text-base font-heading text-mine'>
        &nbsp; Subscribe to our newsletter
      </span> */}
      <div className='my-7'>
        <input
          type='checkbox'
          className='w-5 h-5 p-1'
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
          <p className='mt-4 mb-1 text-base text-mine font-heading'>
            Country / Region *
          </p>
          <p className='mb-4 text-base font-bold text-mine'>
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
          <Select options={states} />
          <Input lable='Postcode / Zip *' />
          <Input lable='Phone (optional)' />
        </div>
      )}
      <p className='text-base text-mine font-heading'>Order notes (optional)</p>
      <textarea className='w-full p-2 mt-1 outline-none bg-input font-heading focus-within:bg-gray-100'></textarea>
    </div>
  );
}
