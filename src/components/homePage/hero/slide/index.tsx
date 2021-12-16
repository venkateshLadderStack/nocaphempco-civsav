import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  bgClass: string;
  leftImage: any;
  rightImage: any;
  path: string;
}

export default function Slide({ bgClass, leftImage, rightImage, path }: Props) {
  const [slideHeight, setSlideHeight] = useState<number>(0);

  const handleResize = () => {
    if (window !== undefined) {
      const windowHeight = window.innerHeight;
      if (window.innerWidth < 480) {
        setSlideHeight(windowHeight - 80);
      } else {
        setSlideHeight(windowHeight);
      }
    }
  };
  useEffect(() => {
    if (window.innerWidth < 480) {
      setSlideHeight(window.innerHeight - 80);
    } else {
      setSlideHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='w-full' style={{ height: slideHeight }}>
      <div
        className={`relative w-full h-full bg-no-repeat bg-cover ${bgClass}`}
      >
        <div className='w-full max-w-[1400px] mx-auto flex h-full'>
          <div className='flex px-12 py-10'>
            <div className='py-[10px] px-3 flex'>
              <div className='flex flex-col items-center justify-center h-full md:flex-row flex-nowrap'>
                <div className='xs:w-full w-[90%] sm:w-[60%] md:w-[45%] relative'>
                  <div>
                    <Link href={path} as={path}>
                      <a>
                        <Image
                          src={leftImage}
                          alt=''
                          width='800'
                          height='600'
                        />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='xs:w-full w-[90%] sm:w-[70%] md:w-[55%] relative'>
                  <div>
                    <Link href={path} as={path}>
                      <a>
                        <Image
                          src={rightImage}
                          alt=''
                          width='800'
                          height='600'
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
