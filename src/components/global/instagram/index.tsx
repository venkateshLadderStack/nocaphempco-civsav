import React from 'react';
import Image from 'next/image';
// import { BsInstagram } from 'react-icons/bs';
import Heading from '../heading';
// import Button from '@/components/global/button';
import Instagram1 from '@/assets/images/instagram_1.png';
import Instagram2 from '@/assets/images/instagram_2.png';
import Instagram3 from '@/assets/images/instagram_3.png';
import Instagram4 from '@/assets/images/instagram_4.png';
import Instagram5 from '@/assets/images/instagram_5.png';
import Instagram6 from '@/assets/images/instagram_6.png';
import Instagram7 from '@/assets/images/instagram_7.png';
import Instagram8 from '@/assets/images/instagram_8.png';
import Instagram9 from '@/assets/images/instagram_9.png';
import Instagram10 from '@/assets/images/instagram_10.png';

const list = [
  Instagram1,
  Instagram2,
  Instagram3,
  Instagram4,
  Instagram5,
  Instagram6,
  Instagram7,
  Instagram8,
  Instagram9,
  Instagram10,
];

export default function Instagram() {
  return (
    <section className='px-4 py-7 mb-7'>
      <div className='mb-10 text-center'>
        <Heading title='Follow us on Instagram' />
      </div>
      <div className='grid h-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {list.map((item, index) => (
          <div
            className='w-full h-full min-h-[180px] lg:min-h-[200px] xl:min-h-[234px] 2xl:min-h-[320px] 4xl:min-h-[380px]'
            key={index}
          >
            <div className='relative w-full h-full'>
              <Image src={item} layout='fill' alt='instagram' />
            </div>
          </div>
        ))}
      </div>
      {/* <div className='flex justify-center mt-10'>
        <Button
          type='externalLink'
          title='nocaphemp'
          icon={<BsInstagram />}
          size='big'
          href='https://www.instagram.com/nocaphemp/'
        />
      </div> */}
    </section>
  );
}
