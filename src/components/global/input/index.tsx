import React from 'react';

interface Props {
  type?: 'text' | 'checkbox' | 'number';
  lable?: string;
  placeholder?: string;
  isValid?: boolean | null;
}

export default function Input({
  lable,
  type,
  placeholder,
  isValid = null,
}: Props) {
  return (
    <div className='w-full my-3'>
      {lable && <p className='text-base text-mine'>{lable}</p>}
      <input
        type={type}
        placeholder={placeholder}
        className={`bg-input w-full outline-none font-heading focus-within:bg-gray-100 leading-5 p-2.5 border-l-2 ${
          isValid === null
            ? 'border-0'
            : isValid
            ? 'border-green-600'
            : 'border-red-600'
        }`}
      />
    </div>
  );
}
