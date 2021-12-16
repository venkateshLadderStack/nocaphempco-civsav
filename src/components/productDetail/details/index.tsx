import React, { useState } from 'react';
import Link from 'next/link';
import Gallery from '../gallery';
import FeaturedImage from '../featuredImage';
import Attributes from '../attributes';
import Quantity from '../quantity';
import Rating from '@/components/global/rating';
import Button from '@/components/global/button';

interface Props {
  product: any;
}

export default function Detail({ product }: Props) {
  const [price] = useState<[string]>(product.price.split(','));
  return (
    <div className='w-full'>
      <div className='block lg:hidden'>
        {product.galleryImages.edges.length > 0 ? (
          <Gallery photos={product.galleryImages.edges} alt={product.name} />
        ) : (
          <FeaturedImage
            imageUrl={product.image.mediaItemUrl}
            alt={product.name}
          />
        )}
      </div>
      <div className='flex items-center space-x-1'>
        <Rating size={24} averageRating={product.averageRating} />
        <span className='text-lg font-bold leading-10 font-heading'>
          ({product.reviewCount})
        </span>
      </div>
      <div className='my-6'>
        <h1 className='text-2xl font-bold leading-7 uppercase font-heading'>
          {product.name}
        </h1>
      </div>
      <div className='pb-6'>
        <p className='text-2xl leading-7 uppercase font-heading'>
          ${price[0].trim()}
        </p>
      </div>
      {/* product detail */}
      {product.shortDescription && (
        <div className='pt-6 border-t border-black entry-content font-heading'>
          <div
            dangerouslySetInnerHTML={{
              __html: product.shortDescription.replace('&hellip;', ''),
            }}
          ></div>
        </div>
      )}
      {/* end */}
      <div className='py-6 space-y-6 border-t border-black'>
        {product.attributes && product.attributes.edges.length > 0 && (
          <Attributes attributesList={product.attributes.edges} />
        )}
        <Quantity />
        <Button type='button' size='big' title='Add to Cart' />
      </div>
      <div className='py-3 border-t border-black'>
        <p className='text-sm font-bold leading-4 text-scorpion font-heading'>
          SKU: {product.sku ? product.sku : 'N/A'}
        </p>
        <p className='space-x-2 text-sm font-bold leading-4 text-scorpion font-heading'>
          Category:&nbsp;
          {product.productCategories.edges.map(
            ({ node }: { node: any }, index: number) => (
              <Link
                href='/'
                as={`/product-category/${node.slug}`}
                key={node.name}
              >
                <a className='uppercase cursor-pointer text-primary'>
                  {node.name}
                  {product.productCategories.edges.length - 1 !== index && (
                    <span className='text-black'>,</span>
                  )}
                </a>
              </Link>
            )
          )}
        </p>
      </div>
    </div>
  );
}
