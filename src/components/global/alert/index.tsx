import React, { Fragment } from 'react';

interface Props {
  type: 'error' | 'success' | 'info';
  text: string;
}

export default function Alert({ type = 'error', text }: Props) {
  return (
    <Fragment>
      {type === 'error' && (
        <div className='p-4 my-2 bg-red-600 border-l-8 border-red-900'>
          <p className='text-base font-normal leading-normal text-white font-heading'>
            {text}
          </p>
        </div>
      )}
      {type === 'success' && (
        <div className='p-4 my-2 bg-green-600 border-l-8 border-green-900'>
          <p className='text-base font-normal leading-normal text-white font-heading'>
            {text}
          </p>
        </div>
      )}
      {type === 'info' && (
        <div className='p-4 my-2 border-l-8 border-yellow-700 bg-primary'>
          <p className='text-base font-normal leading-normal text-white font-heading'>
            {text}
          </p>
        </div>
      )}
    </Fragment>
  );
}
