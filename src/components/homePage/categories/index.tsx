import React from 'react';
import Image from 'next/image';
import Heading from '@/components/global/heading';
import Button from '@/components/global/button';

import Category1 from '@/assets/images/category_1.png';
import Category2 from '@/assets/images/category_2.png';
import Category3 from '@/assets/images/category_3.png';

import Instagram1 from '@/assets/images/instagram_1.png';
import Instagram2 from '@/assets/images/instagram_2.png';
import Instagram3 from '@/assets/images/instagram_3.png';
import Instagram4 from '@/assets/images/instagram_4.png';
import Instagram5 from '@/assets/images/instagram_5.png';
import Instagram6 from '@/assets/images/instagram_6.png';
import Instagram7 from '@/assets/images/instagram_7.png';
import Instagram8 from '@/assets/images/instagram_8.png';
import Instagram10 from '@/assets/images/instagram_10.png';

const list1 = [
  {
    img: Instagram1,
    name: 'Hemp Flower',
    slug: '/shop/cbd-hemp-flower-for-sale',
  },
  {
    img: Instagram2,
    name: 'Moon Rocks',
    slug: '/shop/cbd-moon-rocks-for-sale',
  },
  {
    img: Instagram3,
    name: 'Joints',
    slug: '/shop/cbd-joints-for-sale',
  },
  {
    img: Instagram4,
    name: 'Kief Blunts',
    slug: '/shop/cbd-kief-joints-for-sale',
  },
  {
    img: Instagram5,
    name: 'Concentrates',
    slug: '/shop/cbd-concentrates-for-sale',
  },
  {
    img: Instagram6,
    name: 'Gummies',
    slug: '/shop/cbd-gummies-for-sale',
  },
  {
    img: Instagram7,
    name: 'Tinctures',
    slug: '/shop/cbd-tincture-for-sale',
  },
  {
    img: Instagram8,
    name: 'Pet Tinctures',
    slug: '/shop/cbd-pet-tinctures-for-sale',
  },
  {
    img: Instagram10,
    name: 'Topicals',
    slug: '/shop/cbd-topicals-for-sale',
  },
  {
    img: Instagram1,
    name: 'Vaporizers',
    slug: '/shop/cbd-vaporizers-for-sale',
  },
];

const list = [
  {
    img: Category1,
    name: 'Delta 8',
    slug: '/shop/delta-8-thc-products-for-sale',
  },
  {
    img: Category2,
    name: 'CBD',
    slug: '/shop',
  },
  {
    img: Category3,
    name: 'CBG',
    slug: '/shop/cbg-products-for-sale',
  },
  {
    img: Category1,
    name: 'HHC',
    slug: '/',
  },
  {
    img: Category2,
    name: 'Live Suga',
    slug: '/',
  },
];
interface Props {
  isMasonry?: boolean;
  title?: string;
}

export default function Categories({ isMasonry = false, title }: Props) {
  return (
    <section className='px-4 py-7 mb-14'>
      {title && (
        <div className='mb-10 text-center'>
          <Heading title={title} />
        </div>
      )}
      {isMasonry ? (
        <div className='grid grid-cols-2 gap-4 xs:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {list.map((i, index) => (
            <div
              key={index}
              className='bg-red-200 relative h-[450px] md:h-[50vw] lg:h-[45vw] xl:h-[35vw] 2xl:h-[30vw]'
            >
              <Image
                src={i.img}
                alt='image-grid'
                layout='fill'
                objectFit='cover'
              />
              <div className='absolute flex items-end justify-end w-full h-full p-7'>
                <div className='bottom-0 flex flex-col items-end'>
                  <h4 className='mb-3 text-4xl font-bold text-white font-ubuntu'>
                    {i.name}
                  </h4>
                  <Button
                    type='internalLink'
                    title='shop now'
                    size='small'
                    path={i.slug}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid h-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {list1.map((item, index) => (
            <div
              className='w-full h-full min-h-[450px] sm:min-h-[45vw] md:min-h-[35vw] lg:min-h-[30vw] xl:min-h-[25vw] 2xl:min-h-[20vw]'
              key={index}
            >
              <div className='relative w-full h-full'>
                <Image src={item.img} layout='fill' alt='instagram' />
                <div className='absolute flex items-end justify-end w-full h-full p-7'>
                  <div className='bottom-0 flex flex-col items-end'>
                    <h4 className='mb-3 text-3xl font-bold text-white md:text-4xl font-ubuntu'>
                      {item.name}
                    </h4>
                    <Button
                      type='internalLink'
                      title='shop now'
                      size='small'
                      path={item.slug}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
