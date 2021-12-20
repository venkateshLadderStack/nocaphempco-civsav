import React from 'react';
import Link from 'next/link';

interface Props {
  rootLabel?: string;
  pageList?: parent[];
  currentPageLabel: string;
}
interface parent {
  label: string;
  path: string;
}
export default function BreadCrumb({
  rootLabel = 'Home',
  pageList,
  currentPageLabel,
}: Props) {
  return (
    <div className='text-sm uppercase text-breadcrumb font-heading'>
      <div className='px-4'>
        <div className='flex space-x-1'>
          <span>
            <Link href='/'>
              <a className='border-b-2 hover:text-primary border-[#bbb] hover:border-primary'>
                <span>{rootLabel}</span>
              </a>
            </Link>
          </span>
          {pageList &&
            pageList!.length &&
            pageList!.map((item: parent) => (
              <>
                <span>»</span>
                <span>
                  <Link href={item.path} as={item.path}>
                    <a className='border-b-2 hover:text-primary border-[#bbb] hover:border-primary'>
                      <span>{item.label}</span>
                    </a>
                  </Link>
                </span>
              </>
            ))}
          <span>»</span>
          <span>{currentPageLabel}</span>
        </div>
      </div>
    </div>
  );
}
