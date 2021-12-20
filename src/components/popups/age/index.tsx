import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/assets/images/logo.webp';

export default function AgePopup() {
  const [access, setAccess] = useState(true);
  const [underAge, setunderAge] = useState(true);
  const [remember, setRemember] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('@access')) {
      setAccess(true);
      document.body.style.overflow = 'unset';
    } else {
      setAccess(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const _yes = () => {
    if (remember) {
      localStorage.setItem('@access', 'yes');
    }
    setAccess(true);
    document.body.style.overflow = 'unset';
  };

  const _remember = () => {
    setRemember(!remember);
  };

  if (access) {
    return <></>;
  }

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-white/[.5] z-[1000]' id='age-pop'>
      <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col items-center px-6 py-10 bg-white'>
          <div className='relative max-w-[455px]'>
            <Image src={Logo} alt='Logo' width={800} height={330} />
          </div>
          <p
            className={`text-base font-heading font-bold text-red-700 -mb-3 mt-2  ${
              underAge ? 'hidden' : 'block'
            }`}
          >
            You are not old enough to view this content
          </p>
          <p className='my-3 text-base font-heading text-mine'>
            Are you over 21 years of age?
          </p>
          <div>
            <button
              className='px-4 py-2 mr-2 font-semibold text-white inner-shadow bg-primary'
              onClick={_yes}
            >
              Yes
            </button>
            <button
              className='px-4 py-2 font-semibold text-white inner-shadow bg-primary'
              onClick={() => setunderAge(false)}
            >
              No
            </button>
          </div>
          <div className='mt-3 mb-2'>
            <input
              type='checkbox'
              className='border'
              checked={remember ? true : false}
              onClick={_remember}
            />
            <span className='ml-1 text-base font-heading text-mine'>
              Remember me
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
