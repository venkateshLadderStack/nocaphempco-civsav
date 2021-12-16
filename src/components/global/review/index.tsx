import React from 'react';
import Image from 'next/image';
import { FaShareSquare } from 'react-icons/fa';
import Link from 'next/link';
import Rating from '../rating';

import ThumbUp from '@/assets/svgs/ic-thumb-up.svg';
import ThumbDown from '@/assets/svgs/ic-thumb-down.svg';

interface Props {
  extensive?: boolean;
  review: string;
}

export default function Review({ extensive = false, review }: Props) {
  return (
    <div className='bg-h-review rounded-[50px] shadow-drop'>
      <div className='pt-6 pb-4 px-7'>
        <div className='flex items-center xs:flex-col'>
          <div
            className={`${
              extensive
                ? 'xs:h-[60px] xs:w-[60px] h-[100px] w-[100px]'
                : 'xs:h-[60px] xs:w-[60px] h-[70px] w-[70px]'
            } bg-silver rounded-full flex justify-center items-center`}
          >
            <span
              className={`${
                extensive ? 'xs:text-3xl text-5xl' : 'xs:text-3xl text-4xl'
              } font-bold xs:leading-9 leading-10 text-black uppercase font-heading`}
            >
              M
            </span>
          </div>
          <div className='ml-4'>
            <div className='text-lg font-bold leading-10 text-black font-heading'>
              MARGARET F. Verified Buyer
            </div>
            <Rating averageRating={5} />
          </div>
        </div>
        <div className={`${extensive ? 'xs:mt-5 mt-9' : 'mt-5'}`}>
          <p className='text-lg font-normal leading-[30px] text-black font-heading'>
            {review}
          </p>
        </div>
        <div className={`${extensive ? 'xs:mt-5 mt-14' : 'mt-5'}`}>
          <div className='flex items-center justify-between'>
            <div>
              <Link href='/'>
                <a className='flex text-lg font-bold leading-[30px] text-black font-heading items-center'>
                  <FaShareSquare className='mr-[6px]' /> Share | On Mocha
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
      </div>
    </div>
  );
}
