import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Coupon from '@/components/checkout/coupon';
import BillingDetail from '@/components/checkout/billing';
import OrderDetail from '@/components/checkout/orderDetail';
import BreadCrumb from '@/components/global/breadcrumb';

const Checkout: NextPage = () => {
  return (
    <Layout>
      <div className='px-4 mb-7'>
        <BreadCrumb currentPageLabel='Checkout' />
      </div>
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

export default Checkout;
