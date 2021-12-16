import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import ReactBnbGallery from 'react-bnb-gallery';

// install Swiper modules
SwiperCore.use([Navigation]);

interface Props {
  alt: string;
  photos: any;
}

export default function Gallery({ photos, alt }: Props) {
  const [lightBox, setLightBox] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<any>(null);
  const [activeSlide, setActive] = useState<number>(0);
  const [images, setImages] = useState<any>([]);

  // move slides
  const slideTo = (index: any) => swiper.slideTo(index);

  useEffect(() => {
    const unique = [
      ...Array.from(new Set(photos.map((item: any) => item.node.mediaItemUrl))),
    ];
    setImages([...unique]);
  }, [photos]);

  return (
    <Fragment>
      <ReactBnbGallery
        show={lightBox}
        photos={images}
        onClose={() => setLightBox(false)}
        activePhotoIndex={activeSlide}
        wrap={true}
      />
      <div className='py-7'>
        <div className='max-w-[500px] xl:max-w-[600px] mx-auto'>
          <Swiper
            slidesPerView={1}
            onSlideChange={() => setActive(swiper?.activeIndex)}
            onSwiper={(s: any) => {
              setSwiper(s);
            }}
            className='h-full'
          >
            {images.map((item: string) => (
              <SwiperSlide
                key={item}
                className='w-full'
                onClick={() => setLightBox(true)}
              >
                <div className='flex justify-center'>
                  <div className='relative xs:h-[350px] h-[412px] w-[400px]'>
                    <Image src={item} layout='fill' alt={alt} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='flex flex-wrap items-center justify-center space-x-2.5 mt-9'>
          {images.map((item: string, index: number) => (
            <div
              className={`relative p-1 overflow-hidden border border-black cursor-pointer w-15 h-15 rounded-2xl shadow-drop ${
                activeSlide !== index && 'opacity-50'
              }`}
              key={index}
              onClick={() => {
                slideTo(index);
                setActive(index);
              }}
            >
              <Image src={item} width={50} height={50} alt={alt} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
