import React, { useState } from 'react';
// import Image from 'next/image';
// import Minus from '@/assets/svgs/ic-minus.svg';
// import Add from '@/assets/svgs/ic-plus.svg';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function Accordion({ title, children }: Props) {
  const [active] = useState(true);
  return (
    <div className='pb-8'>
      <div
        className={`py-3 border-t border-black ${
          active ? 'border-b-0' : 'border-b'
        }`}
      >
        <div
          className='flex items-center justify-between px-2 cursor-pointer'
          // onClick={() => setActive(!active)}
        >
          <h5 className='text-lg font-bold leading-10 text-scorpion font-heading'>
            {title}
          </h5>
          {/* {active ? (
            <Image src={Minus} alt='collapse' />
          ) : (
            <Image src={Add} alt='collapse' />
          )} */}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
