import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Button from '@/components/global/button';
import Input from '@/components/global/input';
import { states } from '@/constant/states';
const countries = [{ value: 'us', label: 'United State (US)' }];

export default function Total({
  total,
  free,
  shippingType,
  shippingClass,
  shippingObject,
  cartOption,
  setShippingObject,
  setShippingType,
  setCartOption,
  taxRates,
  tax,
}: any) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(shippingObject.state);
  const [country, setCountry] = useState(shippingObject.country);
  const [city, setCity] = useState<string>(shippingObject.city);
  const [zipCode, setZip] = useState<string>(shippingObject.zip);
  const [localTotal, setLocalTotal] = useState(0);

  // const [address, setAddress] = useState('');

  useEffect(() => {
    let t = 0;
    if (cartOption) {
      if (shippingType === 'free') {
        t = parseFloat(tax) + parseFloat(total);
      } else if (shippingType === 'ground') {
        t =
          parseFloat(tax) +
          parseFloat(total) +
          parseFloat(shippingClass?.ground);
      } else {
        t =
          parseFloat(tax) +
          parseFloat(total) +
          parseFloat(shippingClass?.expedited);
      }
    } else {
      t = total + tax;
    }

    setLocalTotal(t);
  }, [total, shippingClass, cartOption, tax]);

  const _toggle = () => {
    setShow(!show);
  };

  const handleCountry = (selectedOption: any) => {
    setCountry(selectedOption);
  };

  const handleStates = (selectedOption: any) => {
    setState(selectedOption);
  };

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

  const _update = () => {
    if (!country || !state || city === '' || zipCode === '') {
      toast.error('All fields should be filled');
      return;
    }
    const filter = taxRates.edges.filter(
      (item: any) =>
        item.node.state === state.value && item.node.postcode.includes(zipCode)
    );
    // const filterZip = taxRates.edges.filter((item) =>
    //   item.node.postcode.includes(zipCode)
    // );
    // console.log('---zip code');

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
        country: country,
        state: state,
        city: city,
        zip: zipCode,
        tax: taxData,
      });
      setCartOption(true);
      setShow(false);
    }
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
          {cartOption ? (
            <>
              {free >= 50 && (
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
              <p className='mt-3 text-base text-mine'>
                Shipping to
                <span className='font-bold'>{` ${shippingObject?.state?.value}, ${shippingObject?.city}, ${shippingObject?.zip}, United States`}</span>
              </p>
            </>
          ) : (
            <p className='text-sm font-heading'>
              Enter your address to view shipping options.
            </p>
          )}
          <p
            className='mt-1 text-base font-normal cursor-pointer text-primary'
            onClick={_toggle}
          >
            Calculate shipping
          </p>
          <div
            className={`h-auto mt-1 space-y-1 collapse overflow-hidden ${
              show ? 'xs:max-h-72 max-h-64' : 'max-h-0'
            }`}
          >
            <Select
              options={countries}
              placeholder='Select a country / region'
              onChange={handleCountry}
              value={country}
            />
            <Select
              options={states}
              placeholder='State / Country'
              onChange={handleStates}
              value={state}
            />
            <Input
              type='text'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Postcode / ZIP'
              value={zipCode}
              onChange={(e) => setZip(e.target.value)}
            />
            <div className='pt-4 pb-2'>
              <Button
                title=' Update '
                type='button'
                size='small'
                onClick={_update}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center p-3'>
        <p className='w-20 text-base font-bold text-mine'>Tax</p>
        <p className='text-base text-mine'>${tax?.toFixed(2)}</p>
      </div>
      <div className='flex items-center p-3 mb-2 bg-alabaster'>
        <p className='w-20 text-base font-bold text-mine'>Total</p>
        <p className='text-base font-bold text-mine'>
          ${localTotal.toFixed(2)}
        </p>
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
