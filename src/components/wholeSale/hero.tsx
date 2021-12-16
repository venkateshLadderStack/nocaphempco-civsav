import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div
      className='w-full bg-cover bg-center-top sm:px-22'
      style={{
        backgroundImage: `url(${process.env.API_URL}/wp-content/uploads/2021/09/6O7A8376-1.jpg)`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='p-5'>
        <div className='relative xs:w-[300px] xs:h-[299px] w-[360px] h-[359px] mx-auto mb-6'>
          <Image
            src={`${process.env.API_URL}/wp-content/uploads/2021/09/distributor_badge.png`}
            alt=''
            layout='fill'
          />
        </div>
      </div>
    </div>
  );
}
