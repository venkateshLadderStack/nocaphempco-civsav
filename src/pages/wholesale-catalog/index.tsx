import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Button from '@/components/global/button';

const WholeSale: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { menu } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='flex flex-col items-center justify-center px-4 py-8'>
        <h1 className='text-4.5xl font-extrabold text-mine mb-2'>
          Interested in our wholesale catalog?
        </h1>
        <Button
          type='externalLink'
          title='Click here to download our catalog'
          size='small'
          href='https://nocaphempco.com/wp-content/uploads/2020/08/NCHC-Digital-Product-Catalog-v13.pdf'
        />
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
                childItems {
                  edges {
                    node {
                      label
                      title
                      path
                      childItems {
                        edges {
                          node {
                            label
                            title
                            path
                            childItems {
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


export default WholeSale;
