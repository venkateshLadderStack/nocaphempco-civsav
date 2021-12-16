import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShareSquare } from 'react-icons/fa';
import Rating from '@/components/global/rating';
import Alert from '@/components/global/alert';

import ThumbUp from '@/assets/svgs/ic-thumb-up.svg';
import ThumbDown from '@/assets/svgs/ic-thumb-down.svg';

interface Props {
  reviews: any;
  reviewCount: number;
}

export default function ProductReviews({ reviews, reviewCount }: Props) {
  return (
    <section className='px-4 pb-24'>
      <div className='p-3'>
        <h2 className='text-2xl font-bold leading-7 w-min font-heading text-tundora border-b-3 border-primary'>
          Reviews
        </h2>
        {reviews.length > 0 ? (
          <div className='mt-2 border-t border-tundora pt-7'>
            <div className='text-lg leading-6 font-heading text-scorpion'>
              {reviewCount} Reviews
            </div>
            {reviews.map(
              (
                { node, rating }: { node: any; rating: number },
                index: number
              ) => (
                <div className='px-0 py-5 mt-5 md:px-5' key={index}>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='xs:h-[60px] xs:w-[60px] h-[70px] w-[70px] bg-silver rounded-full flex justify-center items-center'>
                        <span className='text-4xl font-bold leading-10 text-black uppercase xs:text-3xl xs:leading-9 font-heading'>
                          {node.author.node.name.charAt(0)}
                        </span>
                      </div>
                      <div className='ml-4'>
                        <div className='text-lg font-bold leading-10 text-black font-heading'>
                          {node.author.node.name}
                        </div>
                        <Rating averageRating={rating} />
                      </div>
                    </div>
                    <div className='text-sm leading-10 font-heading text-scorpion'>
                      {new Date(node.date).toLocaleDateString('en-US')}
                    </div>
                  </div>
                  <div
                    className='my-6 text-lg text-black font-heading'
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  >
                    {/* <p className='text-lg text-black font-heading'></p> */}
                  </div>
                  <div className='flex items-center justify-between pb-5 border-b border-tundora'>
                    <div>
                      <Link href='/'>
                        <a className='flex text-lg font-bold leading-[30px] text-black font-heading items-center'>
                          <FaShareSquare className='mr-[6px]' /> Share
                        </a>
                      </Link>
                    </div>
                    <div className='flex space-x-3'>
                      <button className='flex items-center'>
                        <Image src={ThumbUp} alt='like review' />{' '}
                        <span className='text-lg font-bold leading-[30px] text-black font-heading ml-1'>
                          0
                        </span>
                      </button>
                      <button className='flex items-center'>
                        <Image src={ThumbDown} alt='dislike review' />{' '}
                        <span className='text-lg font-bold leading-[30px] text-black font-heading ml-1'>
                          0
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className='mt-2 border-t border-tundora pt-7'>
            <Alert type='info' text='There are no reviews yet.' />
          </div>
        )}
      </div>
    </section>
  );
}
