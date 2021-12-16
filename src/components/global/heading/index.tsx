import React from 'react';

interface Props {
  title: string;
}

export default function Heading({ title }: Props) {
  return (
    <h3 className='text-4xl font-bold leading-9 text-black uppercase sm:text-5xl sm:leading-10 font-heading'>
      {title}
    </h3>
  );
}
