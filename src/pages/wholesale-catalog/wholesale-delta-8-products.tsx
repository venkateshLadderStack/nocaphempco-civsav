import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Hero from '@/components/wholeSale/hero';
import Title from '@/components/wholeSale/title';
import Detail from '@/components/wholeSale/detail';
import Form from '@/components/wholeSale/form';
// import Button from '@/components/global/button';

const WholeSaleDelta: NextPage = () => {
  return (
    <Layout>
      <div className='overflow-hidden pb-7 pt-24 lg:pt-36'>
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

export default WholeSaleDelta;
