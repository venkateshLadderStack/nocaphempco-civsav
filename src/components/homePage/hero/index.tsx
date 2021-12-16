import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Slide from './slide';
import SlideOneLeftImage from '@/assets/images/slider/Rosin-Got-That-Drip.png';
import SlideOneRightImage from '@/assets/images/slider/Rosin.png';
import SlideTwoLeftImage from '@/assets/images/slider/The-Greatest-Delta-8-THC-Vape-Carts.png';
import SlideTwoRightImage from '@/assets/images/slider/No-Cap-Hemp-Co-Delta-8-Cartridges.png';
import SlideThreeLeftImage from '@/assets/images/slider/Flower-Power-Lab-Tested-Indoor-Grown-Ultra-Premium-CBD-Flower.png';
import SlideThreeRightImage from '@/assets/images/slider/No-Cap-Hemp-Co-Buds.png';
import SlideFourLeftImage from '@/assets/images/slider/Just-How-We-Roll.png';
import SlideFourRightImage from '@/assets/images/slider/No-Cap-Hemp-Co-Prerolls.png';
import Back from '@/assets/svgs/ic-back.svg';
import Forward from '@/assets/svgs/ic-forward.svg';

const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PreArrow />,
  appendDots: (dots: any) => (
    <div
      style={{
        bottom: 3,
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
  customPaging: () => (
    <div className='h-[14px] w-[14px] border border-white rounded-full mb-3 active-dot' />
  ),
};

export default function Hero() {
  return (
    <section className='w-full h-full px-0 mb-0 lg:px-4'>
      <Slider {...settings}>
        <Slide
          bgClass='slide-1'
          leftImage={SlideOneLeftImage}
          rightImage={SlideOneRightImage}
          path='/product/delta-8-thc-sugar-rosin/'
        />
        <Slide
          bgClass='slide-2'
          leftImage={SlideTwoLeftImage}
          rightImage={SlideTwoRightImage}
          path='/delta-8-vapes/'
        />
        <Slide
          bgClass='slide-3'
          leftImage={SlideThreeLeftImage}
          rightImage={SlideThreeRightImage}
          path='/shop/cbd-hemp-flower-for-sale/'
        />
        <Slide
          bgClass='slide-4'
          leftImage={SlideFourLeftImage}
          rightImage={SlideFourRightImage}
          path='/shop/cbd-joints-for-sale/'
        />
      </Slider>
    </section>
  );
}

function PreArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className='slick-arrow z-10 h-[50px] w-[30px] absolute top-[45%] left-4 cursor-pointer hover:bg-opacity-60'
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <Image src={Back} alt='back' />
      </div>
    </div>
  );
}

function NextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className='slick-arrow z-10 h-[50px] w-[30px] absolute top-[45%] right-4 cursor-pointer hover:bg-opacity-60'
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <Image src={Forward} alt='forward' />
      </div>
    </div>
  );
}
