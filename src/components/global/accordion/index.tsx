import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


interface Props {
  titles: [string];
  content: [string];
}

function Accordion({ titles, content }: Props) {
  const [isActive, setIsActive] = useState<number>(100);

  return (
    <div className='m-2'>
      {titles.map((item: string, index: number) => {
        return (
          <div
            className={`border h-auto my-2 p-2 duration-500 ease-in transition-maxHeight max-h-[54px] overflow-hidden ${
              isActive === index ? 'max-h-96' : 'max-h-[54px]'
            }`}
            key={index}
          >
            <div
              className='flex items-center cursor-pointer'
              onClick={() => setIsActive(index)}
            >
              {isActive === index ? (
                <AiOutlineMinus size={15} className='text-primary' />
              ) : (
                <AiOutlinePlus size={15} className='text-primary' />
              )}
              <h5 className='pl-1 font-sans text-2xl font-semibold text-primary'>
                {item}
                <span
                  className={`bg-primary h-[2px] block duration-400 ease-ease transition-width ${
                    isActive === index ? 'w-full' : 'w-0'
                  }`}
                ></span>
              </h5>
            </div>

            <div className='mt-2'>
              <p className='text-base'>{content[index]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Accordion;
