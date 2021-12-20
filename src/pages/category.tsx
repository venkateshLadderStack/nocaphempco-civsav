import React, { useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
// import Product from '@/components/global/product';

const Category: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { menu } = data;
  const [category, setCategory] = useState('');
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='relative flex mx-8 mt-12 mb-8'>
        <div className='hidden mr-6 w-60 lg:block'>
          <p className='pb-1 pl-2 font-normal border-b border-black mt-11 font-heading'>
            Related Categories
          </p>
          <div className='mt-8 ml-5'>
            {['Relax', 'Giggly', 'CBD'].map((item: string, index: number) => (
              <div className='flex items-center mb-2 mr-4' key={item}>
                <input
                  type='radio'
                  id={`category-${index}`}
                  className='absolute w-6 h-6 opacity-0 cursor-pointer'
                  value={item}
                  checked={category === item}
                  onChange={() => setCategory(item)}
                />
                <div className='flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border rounded border-scorpion focus-within:border-primary'>
                  <svg
                    className='hidden w-3 h-3 pointer-events-none fill-current text-primary'
                    version='1.1'
                    viewBox='0 0 17 12'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g fill='none' fillRule='evenodd'>
                      <g
                        transform='translate(-9 -11)'
                        fill='#F1803E'
                        fillRule='nonzero'
                      >
                        <path d='m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z' />
                      </g>
                    </g>
                  </svg>
                </div>
                <label
                  htmlFor={`category-${index}`}
                  className='cursor-pointer select-none text-scorpion'
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full'>
          <div className='relative flex flex-col items-start justify-between pb-3 space-y-4 border-b border-black lg:flex-row lg:items-center lg:space-y-0'>
            <div>
              <h1 className='text-3xl font-bold uppercase font-heading'>
                Flower
              </h1>
              <p className='font-normal font-heading'>
                2749 items found in Flower
              </p>
            </div>
            <div className='flex flex-col items-center w-full mr-5 sm:flex-row sm:justify-between lg:hidden'>
              <label
                htmlFor='standard-select'
                className='w-full text-lg font-heading sm:mr-3'
              >
                Related Category
              </label>
              <div className='w-full custom-select sm:max-w-max'>
                <select
                  id='standard-select'
                  className='py-1 pl-4 pr-10 text-lg leading-10 text-gray-400 bg-transparent outline-none appearance-none font-heading'
                >
                  <option value='Option 1'>Best Match</option>
                </select>
                <svg
                  width='24'
                  height='24'
                  className='arrow-ic'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 16C11.7664 16.0005 11.5399 15.9191 11.36 15.77L5.36003 10.77C5.15581 10.6003 5.02739 10.3564 5.00301 10.0919C4.97863 9.8275 5.06029 9.56422 5.23003 9.36C5.39977 9.15578 5.64368 9.02736 5.90811 9.00298C6.17253 8.9786 6.43581 9.06026 6.64003 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7064 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4699 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.931 9.76345 18.9738 9.89432C19.0166 10.0252 19.0319 10.1635 19.0187 10.3006C19.0056 10.4376 18.9643 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16V16Z'
                    fill='#3C3B42'
                    fillOpacity='0.5'
                  />
                </svg>
              </div>
            </div>
            <div className='flex flex-col items-center w-full mr-5 sm:flex-row sm:justify-between lg:justify-center lg:max-w-max'>
              <label
                htmlFor='standard-select'
                className='w-full text-lg font-heading sm:mr-3'
              >
                Sort By
              </label>
              <div className='w-full custom-select sm:max-w-max'>
                <select
                  id='standard-select'
                  className='py-1 pl-4 pr-10 text-lg leading-10 text-gray-400 bg-transparent outline-none appearance-none font-heading'
                >
                  <option value='Option 1'>Best Match</option>
                </select>
                <svg
                  width='24'
                  height='24'
                  className='arrow-ic'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 16C11.7664 16.0005 11.5399 15.9191 11.36 15.77L5.36003 10.77C5.15581 10.6003 5.02739 10.3564 5.00301 10.0919C4.97863 9.8275 5.06029 9.56422 5.23003 9.36C5.39977 9.15578 5.64368 9.02736 5.90811 9.00298C6.17253 8.9786 6.43581 9.06026 6.64003 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7064 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4699 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.931 9.76345 18.9738 9.89432C19.0166 10.0252 19.0319 10.1635 19.0187 10.3006C19.0056 10.4376 18.9643 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16V16Z'
                    fill='#3C3B42'
                    fillOpacity='0.5'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='py-8'>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
              {/* <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' />
              <Product isRated={true} classes='mx-auto' /> */}
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
                childItems(first: 30) {
                  edges {
                    node {
                      label
                      title
                      path
                      childItems(first: 30) {
                        edges {
                          node {
                            label
                            title
                            path
                            childItems(first: 30) {
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

export default Category;
