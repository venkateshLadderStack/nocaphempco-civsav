import React from 'react';
import Image from 'next/image';
import Button from '@/components/global/button';
import Banner from '@/assets/images/wholesale-banner.png';

export default function WholeSale() {
  return (
    <section className='px-4'>
      <div className='py-5 bg-banner mb-14'>
        <div className='flex flex-col items-center justify-center py-8 space-x-0 space-y-10 lg:flex-row lg:space-x-14 lg:space-y-0'>
          <div className='relative w-full max-w-[448px] min-h-[200px] md:min-h-[276px] xs:min-h-[240px] c-slide-in c-from-left '>
            <Image src={Banner} alt='banner' layout='fill' />
          </div>
          <div className='h-full c-slide-in c-from-right'>
            <p className='text-3xl font-normal uppercase md:text-4xl font-roboto'>
              Become a Wholesale
            </p>
            <h3 className='mb-4 text-3xl font-bold uppercase md:text-4xl font-roboto'>
              Delta-8 Distributor
            </h3>
            <Button
              type='internalLink'
              title='Learn more'
              size='small'
              path='/wholesale-catalog/wholesale-delta-8-products'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
