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
