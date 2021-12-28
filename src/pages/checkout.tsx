import React, { useState } from 'react';
import Script from 'next/script';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import toast from 'react-hot-toast';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Coupon from '@/components/checkout/coupon';
import BillingDetail from '@/components/checkout/billing';
import OrderDetail from '@/components/checkout/orderDetail';
import BreadCrumb from '@/components/global/breadcrumb';
import { useSiteContext } from '@/context';

declare const window: any;

let cardElement: any = null;

const Checkout: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { taxRates } = data;

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({
    firstName: {
      value: '',
      isValid: null,
    },
    lastName: {
      value: '',
      isValid: null,
    },
    company: {
      value: '',
      isValid: null,
    },
    street: {
      value: '',
      isValid: null,
    },
    apartment: {
      value: '',
      isValid: null,
    },
    phone: {
      value: '',
      isValid: null,
    },
    email: {
      value: '',
      isValid: null,
    },
  });
  const {
    list,
    total,
    free,
    shippingType,
    shippingClass,
    shippingObject,
    tax,
    setShippingObject,
    setShippingType,
    // updateCartLength,
  } = useSiteContext();

  const placeOrder = async () => {
    const { firstName, lastName, street, phone, email } = detail;
    console.log('----detail', detail, '--shipping', shippingObject);
    if (
      !firstName.value ||
      !lastName.value ||
      !street.value ||
      !phone.value ||
      !email.value ||
      !shippingObject.city ||
      !shippingObject.zip ||
      !shippingObject.state
    ) {
      toast.error('Address detail must be filled!');
      return;
    }

    if (cardElement === null) {
      toast.error('Card not loaded completely, please refresh the page!');
      return;
    }
    setLoading(true);
    try {
      const result = await cardElement.tokenize();

      if (result.status === 'OK') {
        // console.log(`Payment token is ${result.token}`);
        const payment = {
          source_id: result.token,
          idempotency_key: uuidv4(),
          amount_money: {
            amount: 1,
            currency: 'USD',
          },
        };
        await axios.post('/api/payment', payment);
        toast.success('Payment charged successfully!');
        // When payment and order save on woocommerce successfully then empty the cart

        // localStorage.removeItem('key_product');
        // updateCartLength();

        setLoading(false);
      }
    } catch (e: any) {
      if (e.response?.data) {
        toast.error(`Card charge failed: ${e.response?.data?.data.detail}`);
      } else {
        toast.error(`Payment not charged, please try again!`);
      }
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Script
        src='https://sandbox.web.squarecdn.com/v1/square.js'
        strategy='lazyOnload'
        onLoad={async () => {
          const payments = await window.Square.payments(
            process.env.SQUARE_APPLICATION_ID,
            process.env.LOCATION_ID
          );
          cardElement = await payments.card();

          await cardElement.attach('#card-container');

          // async function eventHandler(event: any) {
          //   // event.preventDefault();
          //   try {
          //     const result = await cardElement.tokenize();

          //     if (result.status === 'OK') {
          //       console.log(`Payment token is ${result.token}`);
          //     }
          //   } catch (e) {
          //     console.error(e);
          //   }
          // }

          // const cardButton = document.getElementById('card-button');

          // cardButton!.addEventListener('click', eventHandler);
        }}
      />
      <div className='pt-24 lg:pt-36'>
        <div className='px-4'>
          <BreadCrumb currentPageLabel='Checkout' />
        </div>
        <div className='px-4 py-8'>
          <Coupon />
          <div className='flex flex-col md:flex-row md:justify-between md:space-x-5'>
            <div className='w-full'>
              <BillingDetail
                taxRates={taxRates}
                detail={detail}
                setDetail={setDetail}
                shippingObject={shippingObject}
                setShippingObject={setShippingObject}
              />
            </div>
            <div className='w-full'>
              <OrderDetail
                list={list}
                total={total}
                free={free}
                shippingType={shippingType}
                shippingClass={shippingClass}
                setShippingType={setShippingType}
                tax={tax}
                onClick={placeOrder}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        taxRates(first: 500) {
          edges {
            node {
              state
              city
              rate
              postcode
              class
              name
            }
          }
        }
      }
    `,
  });
  return { props: { data: data } };
};

export default Checkout;
