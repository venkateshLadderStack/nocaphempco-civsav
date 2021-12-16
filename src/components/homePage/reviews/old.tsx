import React from 'react';
import Heading from '@/components/global/heading';
import Review from '@/components/global/review';
import Rating from '@/components/global/rating';

const review1 =
  'Mosquito zombie\nReview by Ryan T. on 12 Nov 2021review stating Mosquito zombieDense lime buds loads of crystals and sticky with a nice bounce back! Strong cerebral effects that last and kept me focused. This one isn’t gonna scream at ya it will just sneak up on you and you will be on a mission just like a mosquito zombie lol. The effects were pretty quick and taste was not harsh and subtle sweet notes of hazelnut. Glad I go...Read More';
const review2 =
  'I would definitely buy any\n Review by MARGARET F. on 12 Nov 2021review stating I would definitely buy anyI would definitely buy any of the Delta 8 products again. It gives soon pain relief and helps with my anxiety.';
const review3 =
  'Mosquito zombie\n Review by Ryan T. on 12 Nov 2021review stating Mosquito zombieDense lime buds loads of crystals and sticky with a nice bounce back!...Read More';

export default function OldReviews() {
  return (
    <section className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4 mb-14'>
      <div className='flex flex-col items-center justify-center mb-10 sm:flex-row'>
        <Heading title='Reviews' />
        <div className='flex items-center ml-0 sm:ml-5'>
          <Rating size={24} averageRating={5} />
          <div className='ml-2 text-lg font-bold leading-10 text-black uppercase font-heading'>
            (11341)
          </div>
        </div>
      </div>
      <div className='flex flex-col space-x-0 space-y-8 lg:space-y-0 lg:flex-row lg:space-x-9'>
        <div className='w-full lg:w-1/2'>
          <Review extensive review={review1} />
        </div>
        <div className='w-full space-y-8 lg:w-1/2'>
          <Review review={review2} />
          <Review review={review3} />
        </div>
      </div>
    </section>
  );
}
