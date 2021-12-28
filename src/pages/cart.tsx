import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Summary from '@/components/cart/summary';
import Total from '@/components/cart/total';
import Alert from '@/components/global/alert';
import Button from '@/components/global/button';
import { useSiteContext } from '@/context';
import BreadCrumb from '@/components/global/breadcrumb';

const Cart: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { taxRates } = data;
  const {
    list,
    total,
    free,
    shippingType,
    shippingClass,
    shippingObject,
    cartOption,
    tax,
    removeItem,
    onChangeProductQuantity,
    setShippingObject,
    setShippingType,
    setCartOption,
  } = useSiteContext();

  return (
    <Layout>
      <div className='pt-24 lg:pt-36'>
        <div className='px-4'>
          <BreadCrumb currentPageLabel='Cart' />
        </div>

        <div className='px-4 py-8'>
          {list.length === 0 ? (
            <>
              <Alert type='info' text='Your cart currently empty' />
              <br />
              <Button
                type='internalLink'
                path='/'
                title='Return to shop'
                size='small'
              />
            </>
          ) : (
            <div className='flex flex-col py-6 lg:flex-row space-y-9 lg:space-y-0 lg:space-x-9'>
              <Summary
                list={list}
                free={free}
                removeItem={removeItem}
                onChangeProductQuantity={onChangeProductQuantity}
              />
              <Total
                total={total}
                free={free}
                shippingType={shippingType}
                shippingClass={shippingClass}
                shippingObject={shippingObject}
                cartOption={cartOption}
                setShippingObject={setShippingObject}
                setShippingType={setShippingType}
                setCartOption={setCartOption}
                taxRates={taxRates}
                tax={tax}
              />
            </div>
          )}
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

export default Cart;
