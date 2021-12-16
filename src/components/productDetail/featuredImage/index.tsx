import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import ReactBnbGallery from 'react-bnb-gallery';

interface Props {
  imageUrl: string;
  alt: string;
}

export default function FeaturedImage({ imageUrl, alt }: Props) {
  const [lightBox, setLightBox] = useState<boolean>(false);
  return (
    <Fragment>
      <ReactBnbGallery
        show={lightBox}
        photos={[imageUrl]}
        onClose={() => setLightBox(false)}
        wrap={true}
      />
      <div className='pb-12 pt-7'>
        <div
          className='max-w-[500px] xl:max-w-[600px] mx-auto'
          onClick={() => setLightBox(true)}
        >
          <div className='flex justify-center'>
            <div className='relative xs:h-[350px] h-[412px] w-[400px]'>
              <Image src={imageUrl} layout='fill' alt={alt} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
