import React, { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useLazyQuery, gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Seo from '@/components/seo';
import Layout from '@/components/layout';
import Product from '@/components/global/product';
import BreadCrumb from '@/components/global/breadcrumb';
import { sortOptions, sortBy } from '@/constant/sort';

const PAGINATED_QUERY = gql`
  query ($endCursor: String!, $field: ProductsOrderByEnum!, $order: OrderEnum) {
    products(
      after: $endCursor
      where: { status: "publish", orderby: { field: $field, order: $order } }
      first: 36
    ) {
      edges {
        node {
          name
          featured
          description(format: RENDERED)
          reviewCount
          slug
          type
          image {
            mediaItemUrl
            sourceUrl
            altText
          }
          databaseId
          reviews {
            averageRating
          }
          shippingClasses {
            edges {
              node {
                name
                slug
              }
            }
          }
          ... on VariableProduct {
            stockQuantity
            stockStatus
            price(format: RAW)
            taxStatus
            taxClass
          }
          ... on SimpleProduct {
            stockQuantity
            stockStatus
            price(format: RAW)
            taxStatus
            taxClass
          }
          attributes {
            edges {
              node {
                label
                options
                id
                attributeId
                visible
              }
            }
          }
        }
      }
      pageInfo {
        total
        endCursor
        hasNextPage
      }
    }
  }
`;

export default function Shop({
  data,
  query,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products } = data;
  const router = useRouter();
  const [hasNextPage, setNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  // const [total, setTotal] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);
  const [queryParam, setQueryParam] = useState<string>(query || '');
  const [orderField, setOrderField] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');

  const _handleOrder = (value: string) => {
    setQueryParam(value);
    router.push(`/shop?orderby=${value}`);
  };

  // console.log('pageInfo', products.pageInfo);

  const [getProducts, { loading, data: moreProducts, error: clientError }] =
    useLazyQuery(PAGINATED_QUERY, {
      variables: {
        endCursor,
        field: orderField,
        order: orderBy,
      },
    });

  useEffect(() => {
    if (!error && products.edges.length) {
      setProductList([...products.edges]);
      setEndCursor(products.pageInfo.endCursor);
      setNextPage(products.pageInfo.hasNextPage);
      const sort = sortBy(queryParam);
      setOrderField(sort.field);
      setOrderBy(sort.order);
    }
    // const filter = products.edges.filter((i) => i.node.description === null);
    // console.log('----products', filter);
  }, [products]);

  useEffect(() => {
    if (moreProducts && moreProducts.products.edges.length > 0) {
      setProductList([...products.edges, ...moreProducts.products.edges]);
      setEndCursor(moreProducts.products.pageInfo.endCursor);
      setNextPage(moreProducts.products.pageInfo.hasNextPage);
    }
  }, [moreProducts?.products]);

  return (
    <Fragment>
      <Seo title='Shop' />
      <Layout>
        <div className='pt-24 lg:pt-36'>
          <div className='px-4 mb-7'>
            <BreadCrumb currentPageLabel='Shop' />
          </div>
          <div className='w-full py-[150px] shop-banner bg-cover relative mb-18'></div>
          <div className='flex items-center justify-between px-8 mb-7 '>
            <div className='font-heading'>
              <p> Showing 1–36 of 66 results</p>
            </div>
            <div className='flex flex-col items-center w-full sm:flex-row sm:justify-between lg:justify-center lg:max-w-max'>
              <label
                htmlFor='standard-select'
                className='w-full text-lg font-heading sm:mr-3'
              >
                Sort By
              </label>
              <div className='w-full custom-select sm:max-w-max'>
                <select
                  id='standard-select'
                  className='py-1 pl-4 pr-10 text-lg leading-10 text-gray-400 bg-transparent outline-none appearance-none font-heading'
                  value={queryParam}
                  onChange={(event: any) => _handleOrder(event.target.value)}
                >
                  {sortOptions.map(
                    ({ label, value }: { label: string; value: string }) => (
                      <option value={value} key={label}>
                        {label}
                      </option>
                    )
                  )}
                </select>
                <svg
                  width='24'
                  height='24'
                  className='arrow-ic'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 16C11.7664 16.0005 11.5399 15.9191 11.36 15.77L5.36003 10.77C5.15581 10.6003 5.02739 10.3564 5.00301 10.0919C4.97863 9.8275 5.06029 9.56422 5.23003 9.36C5.39977 9.15578 5.64368 9.02736 5.90811 9.00298C6.17253 8.9786 6.43581 9.06026 6.64003 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7064 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4699 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.931 9.76345 18.9738 9.89432C19.0166 10.0252 19.0319 10.1635 19.0187 10.3006C19.0056 10.4376 18.9643 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16V16Z'
                    fill='#3C3B42'
                    fillOpacity='0.5'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='mx-8 border-b border-black border-opacity-50 mb-7'></div>
          <div className='px-4 py-7 mb-7'>
            {!error && productList.length && (
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
                {productList.map(({ node }: { node: any }, index: number) => (
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
                      type={node.type}
                      shippingClass={node.shippingClasses?.edges[0]?.node.slug}
                      taxClass={node.taxClass}
                      taxtStatus={node.taxStatus}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {clientError && (
          <div className='text-2xl text-center capitalize mb-7 font-heading'>
            Something went wrong!
          </div>
        )}
        {hasNextPage && (
          <div className='px-4 py-7'>
            <button
              className='text-center capitalize rounded btn-load-more font-heading'
              onClick={() => getProducts()}
            >
              {loading ? 'Loading . . .' : 'Gimme More!'}
            </button>
          </div>
        )}
      </Layout>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { orderby } = ctx.query;
  const { data, error } = await client.query({
    query: gql`
      query ($field: ProductsOrderByEnum!, $order: OrderEnum) {
        products(
          where: {
            status: "publish"
            orderby: { field: $field, order: $order }
          }
          first: 36
        ) {
          edges {
            node {
              name
              featured
              description(format: RENDERED)
              reviewCount
              slug
              type
              image {
                mediaItemUrl
                sourceUrl
                altText
              }
              databaseId
              reviews {
                averageRating
              }
              shippingClasses {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              ... on VariableProduct {
                stockQuantity
                stockStatus
                price(format: RAW)
                taxStatus
                taxClass
              }
              ... on SimpleProduct {
                stockQuantity
                stockStatus
                price(format: RAW)
                taxStatus
                taxClass
              }
              attributes {
                edges {
                  node {
                    label
                    options
                    id
                    attributeId
                    visible
                  }
                }
              }
            }
          }
          pageInfo {
            total
            endCursor
            hasNextPage
          }
        }
      }
    `,
    variables: sortBy(orderby?.toString() || ''),
  });
  return { props: { data: data, query: orderby, error: error || null } };
};
