import React from 'react';

interface Props {
  attributesList: any;
}

export default function Attributes({ attributesList }: Props) {
  return (
    <div className='space-y-2'>
      {attributesList.map(({ node }: { node: any }, index: number) => (
        <div key={index}>
          <label className='text-lg font-bold leading-10 font-heading text-scorpion'>
            {node.label}
          </label>
          <div className='flex flex-wrap mt-2'>
            {node.options.map((item: string) => (
              <div
                key={item}
                className='mb-2 px-5 text-lg font-normal leading-10 text-opacity-50 border border-opacity-50 rounded border-shipGray font-heading text-shipGray min-w-[157px] text-center cursor-pointer hover:text-primary hover:border-primary mr-2'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className='text-xs font-medium border-none outline-none font-heading text-primary bg-none'>
        Clear selection
      </button>
    </div>
  );
}
