import React from 'react';

interface Props {
  attributesList: any;
  selected: any;
  clear: () => void;
  select: (item: any, label: string, parentIndex: number) => void;
}

export default function Attributes({
  attributesList,
  selected,
  clear,
  select,
}: Props) {
  const _checkInList = (i: string, l: string) => {
    const find = selected.findIndex((fi: any) => fi[l]?.option === i);
    if (find === -1) {
      return false;
    }
    return true;
  };
  return (
    <div className='space-y-2'>
      {attributesList.map((node: any, index: number) => (
        <div key={index}>
          <label className='text-lg font-bold leading-10 font-heading text-scorpion'>
            {node.label}
          </label>
          <div className='flex flex-wrap mt-2'>
            {node.options.map((item: string) => (
              <div
                key={item}
                onClick={() => select(item, node.label, index)}
                className={`mb-2 px-5 text-lg font-normal capitalize leading-10 border rounded font-heading min-w-[157px] text-center cursor-pointer hover:text-primary hover:border-primary mr-2 ${
                  _checkInList(item, node.label)
                    ? 'text-primary border-primary text-opacity-100 border-opacity-100'
                    : 'border-shipGray text-shipGray text-opacity-50 border-opacity-50'
                }`}
              >
                {item === '10 gram'
                  ? '14 gram'
                  : item === '56 gram'
                  ? '56 Gram - Small Nugs'
                  : item}
              </div>
            ))}
          </div>
        </div>
      ))}
      {selected.length > 0 && (
        <button
          onClick={clear}
          className='text-xs font-medium border-none outline-none font-heading text-primary bg-none'
        >
          Clear selection
        </button>
      )}
    </div>
  );
}
