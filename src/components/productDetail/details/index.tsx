import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Gallery from '../gallery';
import FeaturedImage from '../featuredImage';
import Attributes from '../attributes';
import Quantity from '../quantity';
import Rating from '@/components/global/rating';
import Button from '@/components/global/button';
import useCart from '@/hooks/usecart';

interface Props {
  product: any;
}

export default function Detail({ product }: Props) {
  const [price] = useState<string>(product.price.split(',')[0].trim());
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [variations, setVariations] = useState<any>([]);
  const [combination, setCombination] = useState<any>([]);
  const [attributes, setAttributes] = useState<any>([]);
  const [selectedAttr, setSelectedAttr] = useState<any>([]);
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (
      product.type === 'VARIABLE' &&
      product.attributes &&
      product.attributes.edges.length > 0
    ) {
      const attr: any = [];
      // const arrSelect: any = [];
      product.attributes.edges.forEach(({ node }: any) => {
        if (node.visible) {
          const obj = {
            id: node.id,
            label: node.label,
            options: node.options.map((i: string) => i.replace(/-/g, ' ')),
          };

          attr.push(obj);
        }
        // const obj2 = {
        //   [node.label]: {
        //     label: node.label,
        //     option: node.options[0],
        //   },
        // };
        // arrSelect.push(obj2);
        // }
      });

      setAttributes(attr);
      // setSelectedAttr(arrSelect);
    }
  }, []);

  useEffect(() => {
    if (
      product.type === 'VARIABLE' &&
      product.variations &&
      product.variations.edges.length > 0
    ) {
      let list = [];
      list = product.variations.edges.map(({ node }: { node: any }) => {
        const item = node.attributes.edges.map(
          ({ node }: { node: any }) => node.value
        );
        return {
          price: node.price,
          combination: item.toString(),
        };
      });
      setVariations(list);
    }
  }, []);

  const _decrement = () => {
    if (qty === 1) return;
    setQty((pre) => pre - 1);
  };
  const _increment = () => {
    setQty((pre) => pre + 1);
  };

  const clearSelection = () => {
    setSelectedAttr([]);
    setSelectedPrice('');
  };
  const selectOption = (item: any, label: string, parentIndex: number) => {
    const temp: any = [...selectedAttr];
    const comb = [...combination];
    let it = item;
    if (it === '10 gram') {
      it = '14 gram';
    } else if (it === '56 gram') {
      it = '56 Gram - Small Nugs';
    }

    comb[parentIndex] = it;
    setCombination(comb);
    const find = temp.findIndex((fi: any) => fi[label]?.label === label);
    if (find === -1) {
      const obj = {
        [label]: {
          label: label,
          option: it,
        },
      };
      temp.push(obj);
      setSelectedAttr(temp);
    } else {
      temp[find][label] = {
        label: label,
        option: it,
      };
      setSelectedAttr(temp);
    }
    if (temp.length === attributes.length) {
      checkPrice(comb);
    }
  };
  const checkPrice = (comb: any) => {
    const getCombination = variations.find(
      (item: any) =>
        item.combination.toLowerCase().trim() ===
        comb.toString().toLowerCase().trim()
    );
    if (getCombination) {
      setSelectedPrice(getCombination.price.split('$')[1]);
    } else {
      setSelectedPrice('');
    }
  };
  const _addCart = () => {
    if (attributes.length === 0) {
      const final = {
        product_id: product.id,
        image: product?.image?.mediaItemUrl,
        name: product.name,
        price: price,
        quantity: qty,
      };
      addToCart(final);
    } else {
      if (selectedAttr.length === attributes.length) {
        const final = {
          product_id: product.id,
          image: product?.image?.mediaItemUrl,
          name: product.name,
          price: selectedPrice,
          attributes: selectedAttr,
          quantity: qty,
        };
        addToCart(final);
      } else {
        toast.error('Select Attributes');
      }
    }
  };

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
        <p className='text-2xl leading-7 uppercase font-heading'>${price}</p>
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
        {product.stockStatus === 'IN_STOCK' ? (
          <>
            {attributes.length > 0 && (
              <Attributes
                attributesList={attributes}
                selected={selectedAttr}
                clear={clearSelection}
                select={selectOption}
              />
            )}
            <Quantity qty={qty} decrement={_decrement} increment={_increment} />
            {selectedPrice && (
              <div className='py-2'>
                <p className='text-2xl leading-7 uppercase font-heading'>
                  ${selectedPrice}
                </p>
              </div>
            )}
            <Button
              type='button'
              size='big'
              title='Add to Cart'
              onClick={_addCart}
            />
          </>
        ) : (
          <p>Out of stock</p>
        )}
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
