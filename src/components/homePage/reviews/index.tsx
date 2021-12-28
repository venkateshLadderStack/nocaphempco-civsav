import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
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

const list = [
  {
    title: 'DELTA 8 THC BLUNT',
    review:
      'They’re the first company that are consist with the quality of their blunts. I’ve tried other companies and meh… Either the blunts are not rolled right and I have to re-roll or the quality is inconsistent; no cap is my go place for blunts and CBD products.',
    author: 'Willy A',
  },
  {
    title: 'WATERMELON GUMMY RINGS',
    review:
      'OMG! These Gummies are to die for… I ate 2 of them not expecting much out of it, and lets just say I was mind blown x 100. Very impressed. No cap customers service is the best service I have ever encountered out of any kind company. I am now a customer for life.',
    author: 'James',
  },
  {
    title: 'DISPOSABLE VAPE',
    review:
      'A great earthy flavor. Tastes just like Marijuana. Nice little buzz. Highly recommend',
    author: 'Country Girl',
  },
  {
    title: 'CBD JOINTS',
    review:
      'Best joints on the market , along with Splitrock Farms joints are the best I’ve ever tried and I’ve smoked a lot of joints from many companies. These guys have the best.',
    author: 'James',
  },
  {
    title: 'CHOCOLATE BARS',
    review:
      'I bought the fruity pebbles while on vacation in Florida! I absolutely love the chill vibe but it also gave me energy and pain management.',
    author: 'Shannon Powell',
  },
];
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
    <section className='w-full h-full mb-14'>
      <div className='pt-8 pb-16 bg-banner'>
        <div className=' text-xl leading-8 md:text-3xl lg:text-[40px] lg:leading-[60px] text-center font-heading mb-8 font-medium pl-2 pr-10 sm:pl-8 md:pl-0 xs:px-0'>
          {/* Real Reviews From Real Customers */}
        </div>
        <div className='mx-auto' style={{ maxWidth: sliderWidth }}>
          <Slider {...settings}>
            {list.map((item) => (
              <ReviewItem
                key={item.title}
                title={item.title}
                review={item.review}
                author={item.author}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

const ReviewItem = ({
  title,
  review,
  author,
}: {
  title: string;
  review: string;
  author: string;
}) => {
  return (
    <div className='w-full max-w-97 3xl:max-w-[30vw] sm:pr-4 mx-auto'>
      <div className='flex'>
        <div className=''>
          <div className='flex items-center justify-center'>
            <Rating averageRating={5} />
          </div>
          <div className='text-lg font-heading leading-[30px] text-center capitalize'>
            {title}
          </div>
          <div className='text-sm text-center font-heading opacity-60'>
            {review}
          </div>
          {/* <div className='mt-1 text-sm text-center font-heading opacity-60'>
            Read More
          </div> */}
          <div className='mt-2 text-sm text-center font-heading opacity-60'>
            {author}.
          </div>
        </div>
      </div>
    </div>
  );
};

function PreArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className='slick-arrow z-10 bg-opacity-30 h-[50px] w-[30px] absolute top-[35%] hidden md:block -left-5 lg:-left-8 cursor-pointer hover:bg-opacity-60'
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <MdArrowBackIos className='text-black' size={32} />
      </div>
    </div>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className='slick-arrow z-10 bg-opacity-30 h-[50px] w-[30px] absolute top-[35%] hidden md:block -right-5 lg:-right-8 cursor-pointer hover:bg-opacity-60'
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <MdArrowForwardIos className='text-black' size={32} />
      </div>
    </div>
  );
}
