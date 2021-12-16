import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Rating from '@/components/global/rating';

const settings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PreArrow />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export default function Reviews() {
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const handleResize = () => {
    if (window !== undefined) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 992) {
        setSliderWidth(windowWidth - 60);
      } else {
        setSliderWidth(windowWidth - 120);
      }
    }
  };
  useEffect(() => {
    if (window.innerWidth < 992) {
      setSliderWidth(window.innerWidth - 60);
    } else {
      setSliderWidth(window.innerWidth - 120);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section className='w-full h-full mb-14 lg:px-4 '>
      <div className='pt-8 pb-16 bg-banner '>
        <div className=' text-xl leading-8 md:text-3xl lg:text-[40px] lg:leading-[60px] md:text-center font-heading mb-8 font-medium pl-2 pr-10 sm:pl-8 md:pl-0'>
          Real Reviews From Real Customers
        </div>
        <div className='mx-auto' style={{ maxWidth: sliderWidth }}>
          <Slider {...settings}>
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
            <ReviewItem />
          </Slider>
        </div>
      </div>
    </section>
  );
}

const ReviewItem = () => {
  return (
    <div className='w-full max-w-97 3xl:max-w-[30vw] pr-4'>
      <div className='flex items-center xl:hidden'>
        <Rating averageRating={5} />
        <span className='ml-2 font-heading'>12/07/21</span>
      </div>
      <div className='text-lg font-heading leading-[30px] xl:hidden mb-4'>
        Heavenly Forbidden Fruit
      </div>
      <div className='flex'>
        <div>
          <Link href='#'>
            <a className='hover:underline'>
              <div className='w-23'>
                <div className='relative bg-white rounded h-23 w-23'>
                  <Image
                    src='https://nocaphempco.com/wp-content/uploads/2021/04/No-Cap-Hemp-Co-Delta-8-THC-Diamonds.jpg'
                    alt=''
                    width={500}
                    height={500}
                    objectFit='contain'
                  />
                </div>
                <div className='mt-2 text-base leading-6 lg:text-xl font-heading'>
                  White Fire OG
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className='ml-3'>
          <div className='items-center hidden xl:flex'>
            <Rating averageRating={5} />
            <span className='ml-2 font-heading'>12/07/21</span>
          </div>
          <div className='text-lg font-heading leading-[30px] hidden xl:block'>
            Heavenly Forbidden Fruit
          </div>
          <div className='text-sm font-heading opacity-60'>
            This one taste like clinic cannabis strain. Some of the vapes taste
            soapy but this one doesn&apos;t. The effects help with study and
            re...
          </div>
          <div className='mt-1 text-sm font-heading opacity-60'>Read More</div>
          <div className='mt-2 text-sm font-heading opacity-60'>Tom G.</div>
        </div>
      </div>
    </div>
  );
};

function PreArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className='slick-arrow z-10 h-[50px] w-[30px] absolute xs:-top-22 -top-18 lg:-top-22 cursor-pointer xs:right-3 right-6'
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <MdArrowBackIos className='text-black' size={32} />
      </div>
    </div>
  );
}

function NextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className='slick-arrow z-10 h-[50px] w-[30px] absolute xs:-top-22 xs:-right-1 -top-18 lg:-top-22 right-0 cursor-pointer'
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <MdArrowForwardIos className='text-black' size={32} />
      </div>
    </div>
  );
}
