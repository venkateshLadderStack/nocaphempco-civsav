import React from 'react';

interface Props {
  type?: 'text' | 'checkbox' | 'number' | 'email';
  lable?: string;
  placeholder?: string;
  isValid?: boolean | null;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  lable,
  type,
  placeholder,
  isValid = null,
  value,
  name,
  onChange,
  onFocus,
  onBlur,
}: Props) {
  return (
    <div className='w-full my-3'>
      {lable && <p className='text-base text-mine'>{lable}</p>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className='placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-1 sm:text-sm'
      />
    </div>
  );
}
