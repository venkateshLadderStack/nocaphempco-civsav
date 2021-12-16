import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Coupon from '@/components/checkout/coupon';
import BillingDetail from '@/components/checkout/billing';
import OrderDetail from '@/components/checkout/orderDetail';

const Checkout: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { menu } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='px-4 py-8'>
        <Coupon />
        <div className='flex flex-col pt-12 md:flex-row md:justify-between md:space-x-5'>
          <div className='w-full'>
            <BillingDetail />
          </div>
          <div className='w-full'>
            <OrderDetail />
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
        menu(id: "67", idType: DATABASE_ID) {
          databaseId
          id
          locations
          name
          slug
          menuItems(first: 100) {
            edges {
              node {
                path
                title
                label
                childItems(first: 30)  {
                  edges {
                    node {
                      label
                      title
                      path
                      childItems(first: 30)  {
                        edges {
                          node {
                            label
                            title
                            path
                            childItems(first: 30)  {
                              edges {
                                node {
                                  label
                                  title
                                  path
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  return { props: { data: data } };
};

export default Checkout;
