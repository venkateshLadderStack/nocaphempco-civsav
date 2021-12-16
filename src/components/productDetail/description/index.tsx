import React from 'react';
import Gallery from '../gallery';
import FeaturedImage from '../featuredImage';
import Accordion from '../accordion';
// import ExtraProduct from '../extraProducts';

interface Props {
  product: any;
}

export default function Description({ product }: Props) {
  return (
    <div className='w-full'>
      <div className='hidden lg:block'>
        {product.galleryImages.edges.length > 0 ? (
          <Gallery photos={product.galleryImages.edges} alt={product.name} />
        ) : (
          <FeaturedImage
            imageUrl={product.image.mediaItemUrl}
            alt={product.name}
          />
        )}
      </div>
      <div className='mt-6 lg:mt-0'>
        {product.description && (
          <Accordion title='Product Details'>
            <div className='px-2 entry-content product-desc-content font-heading'>
              <h2>Description:</h2>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          </Accordion>
        )}
        {/* <Accordion title='FAQs' /> */}
      </div>
      {/* <ExtraProduct /> */}
    </div>
  );
}
