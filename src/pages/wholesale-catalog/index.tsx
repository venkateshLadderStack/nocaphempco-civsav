import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Button from '@/components/global/button';

const WholeSale: NextPage = () => {
  return (
    <Layout>
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

export default WholeSale;
