import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Hero from '@/components/wholeSale/hero';
import Title from '@/components/wholeSale/title';
import Detail from '@/components/wholeSale/detail';
import Form from '@/components/wholeSale/form';
// import Button from '@/components/global/button';

const WholeSaleDelta: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { menu } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='overflow-hidden py-7'>
        <Hero />
        <Title />
        <Detail />
        <Form />

        <div
          className='p-[300px] w-full bg-cover bg-center-top'
          style={{
            backgroundImage: `url(${process.env.API_URL}/wp-content/uploads/2021/09/D8_Wholesale.jpg)`,
            backgroundPosition: 'center center',
          }}
        ></div>
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


export default WholeSaleDelta;
