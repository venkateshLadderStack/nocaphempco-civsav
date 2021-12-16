import React from 'react';
import Button from '../global/button';

export default function Detail() {
  return (
    <div className='py-7'>
      <div className='px-0 sm:px-11 md:px-22'>
        <div className='p-10 xs:px-5'>
          <h5 className='text-2xl font-medium leading-7 text-center font-heading'>
            Our Delta-8 products are made by and for cannabis aficionados.
            Carefully Hand crafted in house using proprietary methods we created
            to make our High quality product line. Our moonrocks, Kief joints
            and exclusive live resin products are second to none because no one
            else can make them quite like we do! We use only the rarest plant
            genetics and cutting-edge science and technology to create what so
            many consider the best Delta 8 Products in the nation. Recognized by
            Forbes this year and High Times as 2021 Hemp Cup winners taking 1st
            place in our category! Be part of a winning team and make No Cap
            Hemp products the front runner in your line up today!
          </h5>
          <p className='mb-6'>&nbsp;</p>
          <div className='flex items-center justify-center mb-6'>
            <Button
              size='small'
              title='Download Catalog'
              type='externalLink'
              href={`${process.env.API_URL}wp-content/uploads/2021/09/NCHC-Mobile-Optimized-Digital-Catalog-v28.pdf`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
