import React from 'react';
import Heading from '@/components/global/heading';
import Product from '@/components/global/product';

interface Props {
  products: any;
}

export default function LatestProducts({ products }: Props) {
  return (
    <section>
      <div className='px-4 py-7 mb-7'>
        <div className='mb-10 text-center'>
          <Heading title='Latest Products' />
        </div>
        {products.length && (
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
            {products.map(({ node }: { node: any }, index: number) => (
              <div key={index} className='mx-auto'>
                <Product
                  id={node.databaseId}
                  name={node.name}
                  slug={node.slug}
                  stockStatus={node.stockStatus}
                  isRated={node.reviewCount > 0}
                  averageRating={node.reviews.averageRating}
                  price={node.price}
                  attributes={node.attributes}
                  thumbnail={node.image.mediaItemUrl}
                  isSlider
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
