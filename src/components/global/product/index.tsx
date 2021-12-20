import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '../rating';
import Button from '../button';
import useCart from '@/hooks/usecart';

interface Props {
  id: string;
  isRated?: boolean;
  classes?: string;
  shop?: boolean;
  isSlider?: boolean;
  name: string;
  slug: string;
  stockStatus: string;
  averageRating: number;
  price: string;
  attributes: any;
  thumbnail: string;
  type?: string;
}

export default function Product({
  id,
  isRated,
  classes,
  shop,
  name,
  slug,
  stockStatus,
  averageRating,
  price,
  isSlider = false,
  thumbnail,
  type,
}: Props) {
  const { addToCart } = useCart();
  return (
    <div
      className={`p-2 rounded-lg hover:shadow-4x ${classes} ${
        shop ? 'w-full' : 'xs:w-full w-[270px] lg:w-[300px] 3xl:w-[19vw]'
      }`}
    >
      <div
        className={`xs:h-[300px] h-[250px] relative w-full ${
          shop ? ' md:h-[25vw] 3xl:h-[27vw]' : '3xl:h-[19vw]'
        }`}
      >
        <Image src={thumbnail} alt='title' layout='fill' />
        <Link href='/product/[slug]' as={`/product/${slug}`}>
          <a className='absolute z-10 w-full h-full'></a>
        </Link>
      </div>
      <div className='px-1 mt-5'>
        <Link href='/product/[slug]' as={`/product/${slug}`}>
          <a>
            <h2 className='text-lg font-bold text-center uppercase font-roboto leading-[21px] overflow-hidden h-[42px]'>
              {name}
            </h2>
            <div className='flex flex-col items-center justify-center max-w-md mx-auto mt-3 4xl:max-w-lg'>
              <div className='text-lg font-bold font-roboto leading-[21px] mb-2'>
                {price.split(',').length > 1 ? (
                  <>
                    <span className='text-[14px] leading-4'>From</span>&nbsp;$
                    {price.split(',')[0].trim()}
                  </>
                ) : (
                  `$${price}`
                )}
              </div>
              {isRated ? (
                <Rating size={16} averageRating={averageRating} />
              ) : (
                <div className='text-xs text-[#999]'>NOT RATED</div>
              )}
            </div>
          </a>
        </Link>
        <div className='flex justify-center mt-5 mb-2 text-center'>
          {type === 'VARIABLE' ? (
            <Button
              title={
                stockStatus === 'IN_STOCK' ? 'Choose Products' : 'Read More'
              }
              type='internalLink'
              size='big'
              path={`/product/${slug}`}
              isSlider={isSlider}
            />
          ) : (
            <>
              {stockStatus === 'IN_STOCK' ? (
                <Button
                  title='Add to Cart'
                  type='button'
                  size='big'
                  isSlider={isSlider}
                  onClick={() =>
                    addToCart({
                      product_id: id,
                      image: thumbnail,
                      name: name,
                      price: price,
                      quantity: 1,
                    })
                  }
                />
              ) : (
                <Button
                  title='Read More'
                  type='internalLink'
                  size='big'
                  path={`/product/${slug}`}
                  isSlider={isSlider}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
