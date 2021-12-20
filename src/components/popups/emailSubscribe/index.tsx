import React from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import product from '@/assets/images/email-popup-image.webp';

interface Props {
  close: () => void;
}
export default function EmailSubscribe({ close }: Props) {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-white/[.5] z-[1100]'>
      <div className='flex items-center justify-center h-full'>
        <div className='relative flex flex-col items-center w-full max-w-[85%] md:max-w-[60%] lg:max-w-[45%] bg-white px-6 py-10 shadow-emailPopup border-[1px] border-none border-black'>
          <div
            className='absolute top-0 right-0 p-1 bg-green-600 cursor-pointer'
            onClick={close}
          >
            <AiOutlineClose size={18} color='#fff' />
          </div>
          <h1 className='leading-10 font-extrabold font-heading text-mine text-[40px] text-center'>
            New Customer?
          </h1>
          <h3 className='text-[28px] leading-8 font-bold font-heading text-mine my-[10px] text-center'>
            Sign up to our mailing list
          </h3>
          <h2 className='text-[32px] leading-[34px] font-bold font-heading text-mine my-[10px]'>
            to get 10% off
          </h2>
          <p className='font-semibold font-heading text-mine text-[26px] leading-[26px] my-[5px]'>
            your first order!
          </p>
          <div className='flex flex-col items-center max-w-[80%] w-full mx-auto'>
            <input
              type='email'
              placeholder='Your email address'
              className='w-full my-3 border outline-none border-[#bbb] shadow-emailInput leading-5 p-[10px]'
            />
            <div>
              <button className='px-3 py-2 font-semibold text-white bg-primary inner-shadow'>
                Sign up
              </button>
            </div>
          </div>
          <div className='relative mt-4'>
            <Image src={product} alt='alert-img' width={800} height={289} />
          </div>
        </div>
      </div>
    </div>
  );
}
