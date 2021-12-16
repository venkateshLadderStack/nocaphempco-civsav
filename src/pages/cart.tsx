import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Summary from '@/components/cart/summary';
import Total from '@/components/cart/total';
import Alert from '@/components/global/alert';

const Cart: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { menu } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='px-4 py-8'>
        <Alert type='error' text='There is an error' />
        <Alert type='success' text='Success' />
        <div className='flex flex-col py-6 lg:flex-row space-y-9 lg:space-y-0 lg:space-x-9'>
          <Summary />
          <Total />
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


export default Cart;
