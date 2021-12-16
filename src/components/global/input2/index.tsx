import React from 'react';

interface Props {
  type?: 'text' | 'checkbox' | 'number';
  lable?: string;
  placeholder?: string;
  isValid?: boolean | null;
  required?: boolean;
  textArea?: boolean;
}

export default function Input({
  lable,
  type,
  placeholder,
  required,
  isValid = true,
  textArea,
}: Props) {
  return (
    <div className={`w-full my-4 ${!lable && 'mt-8'}`}>
      {lable && (
        <p className='text-base text-mine font-bold'>
          {lable} {required && <span className='text-red-600'>*</span>}
        </p>
      )}
      {textArea ? (
        <textarea
          className={`bg-white w-full border outline-none focus:border-gray-400 font-heading leading-5 p-2.5  ${
            !isValid && 'border-red-600'
          }`}
          rows={9}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`bg-white w-full border outline-none focus:border-gray-400 font-heading leading-5 p-2.5  ${
            !isValid && 'border-red-600'
          }`}
        />
      )}
    </div>
  );
}
