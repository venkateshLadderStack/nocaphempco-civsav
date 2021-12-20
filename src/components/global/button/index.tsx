import React, { Fragment } from 'react';
import Link from 'next/link';

interface Props {
  type: 'button' | 'externalLink' | 'internalLink';
  icon?: React.ReactNode;
  title: string;
  size: 'small' | 'big';
  href?: string;
  path?: any;
  isSlider?: boolean;
  onClick?: () => void;
}

export default function Button({
  type,
  icon,
  title,
  size,
  href,
  path = '/',
  isSlider = false,
  onClick,
}: Props) {
  return (
    <Fragment>
      {type === 'button' ? (
        <button
          type='button'
          className='p-[2px] bg-btn-border rounded-full max-w-max shadow-drop'
          onClick={onClick}
        >
          {isSlider ? (
            <div
              className={`bg-btn rounded-full font-roboto font-black text-black uppercase flex justify-center items-center ${
                size === 'big'
                  ? 'px-8 py-3 text-base lg:text-lg'
                  : 'py-3.5 px-5 text-xs'
              }`}
            >
              {icon && <div className='mr-2'>{icon}</div>}
              {title}
            </div>
          ) : (
            <div
              className={`bg-btn rounded-full font-roboto font-black text-black uppercase flex justify-center items-center ${
                size === 'big' ? 'px-8 py-3 text-lg' : 'py-3.5 px-5 text-xs'
              }`}
            >
              {icon && <div className='mr-2'>{icon}</div>}
              {title}
            </div>
          )}
        </button>
      ) : (
        <>
          {type === 'externalLink' ? (
            <a
              className='cursor-pointer'
              href={href}
              target='_blank'
              rel='noreferrer'
            >
              <div className='p-[2px] bg-btn-border rounded-full max-w-max shadow-drop'>
                <div
                  className={`bg-btn rounded-full font-roboto font-black text-black uppercase flex justify-center items-center ${
                    size === 'big' ? 'px-8 py-3 text-lg' : 'py-3.5 px-5 text-xs'
                  }`}
                >
                  {icon && <div className='mr-2'>{icon}</div>}
                  {title}
                </div>
              </div>
            </a>
          ) : (
            <Link href={path} as={path}>
              <a className='cursor-pointer'>
                <div className='p-[2px] bg-btn-border rounded-full max-w-max shadow-drop'>
                  {isSlider ? (
                    <div
                      className={`bg-btn rounded-full font-roboto font-black text-black uppercase flex justify-center items-center ${
                        size === 'big'
                          ? 'px-8 py-3 text-base lg:text-lg'
                          : 'py-3.5 px-5 text-xs'
                      }`}
                    >
                      {icon && <div className='mr-2'>{icon}</div>}
                      {title}
                    </div>
                  ) : (
                    <div
                      className={`bg-btn rounded-full font-roboto font-black text-black uppercase flex justify-center items-center ${
                        size === 'big'
                          ? 'px-8 py-3 text-lg'
                          : 'py-3.5 px-5 text-xs'
                      }`}
                    >
                      {icon && <div className='mr-2'>{icon}</div>}
                      {title}
                    </div>
                  )}
                </div>
              </a>
            </Link>
          )}
        </>
      )}
    </Fragment>
  );
}
