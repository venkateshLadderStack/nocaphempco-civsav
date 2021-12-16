import React, { useEffect } from 'react';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

interface Props {
  size?: number;
  averageRating: number;
}
export default function Rating({ size = 18, averageRating }: Props) {
  useEffect(() => {
    // _buildRating();
  }, [averageRating]);
  const _buildRating = () => {
    const starts = [];
    for (let i = 0; i < averageRating; i++) {
      starts.push(<TiStarFullOutline className='text-primary' size={size} />);
    }
    for (let i = 0; i < 5 - averageRating; i++) {
      starts.push(<TiStarOutline className='text-primary' size={size} />);
    }
    return starts;
  };
  return <div className='flex xs:justify-center'>{_buildRating()}</div>;
}
