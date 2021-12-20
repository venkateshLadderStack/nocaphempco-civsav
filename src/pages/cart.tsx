import React from 'react';
import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Summary from '@/components/cart/summary';
import Total from '@/components/cart/total';
// import Alert from '@/components/global/alert';
import { useSiteContext } from '@/context';
import BreadCrumb from '@/components/global/breadcrumb';

const Cart: NextPage = () => {
  const { list, removeItem, total, onChangeProductQuantity } = useSiteContext();
  return (
    <Layout>
      <div className='px-4 mb-7'>
        <BreadCrumb currentPageLabel='Cart' />
      </div>
      <div className='px-4 py-8'>
        {/* <Alert type='success' text='Success' />  */}
        <div className='flex flex-col py-6 lg:flex-row space-y-9 lg:space-y-0 lg:space-x-9'>
          <Summary
            list={list}
            removeItem={removeItem}
            onChangeProductQuantity={onChangeProductQuantity}
          />
          <Total total={total} />
        </div>
      </div>
    </Layout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data } = await client.query({
//     query: gql`
//       query {

//       }
//     `,
//   });
//   return { props: { data: data } };
// };

export default Cart;
