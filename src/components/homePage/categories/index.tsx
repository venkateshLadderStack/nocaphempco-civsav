import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/global/heading';
import Button from '@/components/global/button';

import Category1 from '@/assets/images/category_1.png';
import Category2 from '@/assets/images/category_2.png';
import Category3 from '@/assets/images/category_3.png';

export default function Categories() {
  return (
    <section className='px-4 py-7 mb-14'>
      <div className='mb-10 text-center'>
        <Heading title='Categories' />
      </div>
      <div className='flex flex-col flex-wrap md:flex-row md:flex-nowrap'>
        <div className='w-full pr-0 space-y-4 md:pr-2 md:w-1/2'>
          <div className='relative w-full h-[300px] sm:h-[387px] md:h-full md:max-h-[280px] lg:max-h-[387px] 3xl:min-h-[452px] 4xl:min-h-[500px] cat-anim__scale'>
            <Image src={Category1} alt='category thumbnail' layout='fill' />
            <div className='absolute flex items-end justify-end w-full h-full p-7'>
              <div className='bottom-0 flex flex-col items-end'>
                <h4 className='mb-3 text-4xl font-bold text-white font-ubuntu'>
                  Gummies
                </h4>
                <Button
                  type='internalLink'
                  title='shop now'
                  size='small'
                  path='/shop/cbd-gummies-for-sale/'
                />
              </div>
            </div>
            <Link href='/shop/cbd-gummies-for-sale/'>
              <a className='absolute z-10 w-full h-full'></a>
            </Link>
          </div>
          <div className='relative w-full h-[300px] sm:h-[387px] md:h-full md:max-h-[280px] lg:max-h-[387px] 3xl:min-h-[452px] 4xl:min-h-[500px] cat-anim__scale'>
            <Image src={Category2} alt='category thumbnail' layout='fill' />
            <div className='absolute flex items-end justify-end w-full h-full p-7'>
              <div className='bottom-0 flex flex-col items-end'>
                <h4 className='mb-3 text-4xl font-bold text-white font-ubuntu'>
                  CBD
                </h4>
                <Button
                  type='internalLink'
                  title='shop now'
                  size='small'
                  path='/shop/cbd-hemp-flower-for-sale/'
                />
              </div>
            </div>
            <Link href='/shop/cbd-hemp-flower-for-sale/'>
              <a className='absolute z-10 w-full h-full'></a>
            </Link>
          </div>
        </div>
        <div className='w-full pl-0 mt-4 md:mt-0 md:pl-2 md:w-1/2'>
          <div className='relative w-full h-[300px] sm:h-[387px] md:h-full md:min-h-[576px] lg:min-h-[790px] 3xl:min-h-[920px] 4xl:min-h-[1017px] overflow-hidden cat-anim__scale'>
            <Image src={Category3} alt='category thumbnail' layout='fill' />
            <div className='absolute flex items-end justify-end w-full h-full p-7'>
              <div className='bottom-0 flex flex-col items-end'>
                <h4 className='mb-3 text-4xl font-bold text-white font-ubuntu'>
                  Moonrock
                </h4>
                <Button
                  type='internalLink'
                  title='shop now'
                  size='small'
                  path='/shop/cbd-moon-rooks-for-sale/'
                />
              </div>
            </div>
            <Link href='/shop/cbd-moon-rooks-for-sale/'>
              <a className='absolute z-10 w-full h-full'></a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
