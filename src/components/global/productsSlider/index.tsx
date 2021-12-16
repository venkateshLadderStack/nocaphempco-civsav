import React from 'react';
import Slider from 'react-slick';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import Heading from '@/components/global/heading';
import Product from '@/components/global/product';

const settings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PreArrow />,
  responsive: [
    {
      breakpoint: 1499,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1220,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        className: 'center',
        centerMode: true,
        centerPadding: '125px',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface Props {
  title: string;
  items: any;
}

export default function ProductsSlider({ title, items }: Props) {
  return (
    <section className='relative px-4 mb-14'>
      <div className='mb-10 text-center'>
        <Heading title={title} />
      </div>
      <Slider {...settings}>
        {items.map(({ node }: { node: any }, index: number) => (
          <div className='px-2 py-7' key={index}>
            <Product
              name={node.name}
              slug={node.slug}
              stockStatus={node.stockStatus}
              isRated={node.reviewCount > 0}
              averageRating={node.reviews.averageRating}
              price={node.price}
              attributes={node.attributes}
              thumbnail={node.image.mediaItemUrl}
              isSlider
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}

function PreArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className='slick-arrow bg-black z-10 bg-opacity-30 h-[50px] w-[30px] absolute top-[45%] cursor-pointer hover:bg-opacity-60'
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <MdOutlineArrowBackIos className='text-white' />
      </div>
    </div>
  );
}

function NextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className='slick-arrow bg-black z-10 bg-opacity-30 h-[50px] w-[30px] absolute top-[45%] right-0 cursor-pointer hover:bg-opacity-60'
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <MdOutlineArrowForwardIos className='text-white' />
      </div>
    </div>
  );
}
