import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/global/button';

export default function ExtraProduct() {
  return (
    <div className='py-10 mx-16 xs:mx-0'>
      <div className='text-xs leading-[14px] text-scorpion text-center font-bold mb-3'>Buy it with</div>
      <Link href='/' as='/'>
        <a>
          <div className='flex items-center'>
            <div className='relative w-20 h-20 mr-5'>
              <Image
                src='https://nocaphempco.com/wp-content/uploads/2020/09/Sour-G-10-G.jpg'
                alt=''
                layout='fill'
              />
            </div>
            <div className='flex items-center justify-between w-full h-full px-4 py-5 bg-banner'>
              <div>
                <h5 className='font-roboto text-[14px] leading-4 uppercase font-black'>
                  Sour g cbg
                </h5>
                <p className='font-roboto text-[10px] leading-3'>From $29.99</p>
              </div>
              <Button type='internalLink' size='small' title='view item' />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
