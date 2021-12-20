import React, { Fragment, useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Seo from '@/components/seo';
import Layout from '@/components/layout';
import Product from '@/components/global/product';
import BreadCrumb from '@/components/global/breadcrumb';

export default function Shop({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products } = data;

  useEffect(() => {
    // const filter = products.edges.filter((i) => i.node.description === null);
    // console.log('----products', filter);
  }, []);

  return (
    <Fragment>
      <Seo title='Shop' />
      <Layout>
        <div className='px-4 mb-7'>
          <BreadCrumb currentPageLabel='Shop' />
        </div>
        <div className='w-full py-[150px] shop-banner bg-cover relative mb-28'></div>
        <div className='px-4 py-7 mb-7'>
          {!error && products.edges.length && (
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
              {products.edges.map(({ node }: { node: any }, index: number) => (
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
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </Fragment>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await client.query({
    query: gql`
      query {
        products(
          where: { status: "publish", orderby: { field: DATE, order: DESC } }
          first: 66
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
              ... on VariableProduct {
                stockQuantity
                stockStatus
                price(format: RAW)
              }
              ... on SimpleProduct {
                stockQuantity
                stockStatus
                price(format: RAW)
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
        }
      }
    `,
  });
  return { props: { data: data, error: error || null } };
};
