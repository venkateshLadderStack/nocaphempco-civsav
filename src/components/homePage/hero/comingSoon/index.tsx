import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeftImage from '@/assets/images/slider/heading-hhc-banner.png';
import RightImage from '@/assets/images/slider/products-hhc-banner.png';

export default function ComingSoon() {
  const [slideHeight, setSlideHeight] = useState<number>(0);

  const handleResize = () => {
    if (window !== undefined) {
      const windowHeight = window.innerHeight;
      if (window.innerWidth < 1792) {
        setSlideHeight(windowHeight);
      } else {
        setSlideHeight(windowHeight - 120);
      }
    }
  };
  useEffect(() => {
    if (window.innerWidth < 1792) {
      setSlideHeight(window.innerHeight);
    } else {
      setSlideHeight(window.innerHeight - 120);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='w-full' style={{ height: slideHeight }}>
      <div className={`relative w-full h-full bg-no-repeat slide-1`}>
        <div className='flex w-full h-full mx-auto'>
          <div className='flex px-12 py-10'>
            <div className='py-[10px] px-3 flex'>
              <div className='flex flex-col items-center justify-center h-full pt-4 md:flex-row flex-nowrap'>
                <div className='xs:w-full w-[90%] sm:w-[60%] md:w-[28%] relative pl-4'>
                  <div>
                    <Link href='/' as='/'>
                      <a>
                        <Image
                          src={LeftImage}
                          alt=''
                          width='500'
                          height='500'
                        />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='xs:w-full w-[90%] sm:w-[70%] md:w-[65%] relative'>
                  <div>
                    <Link href='/' as='/'>
                      <a>
                        <Image
                          src={RightImage}
                          alt=''
                          width='1230'
                          height='700'
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
