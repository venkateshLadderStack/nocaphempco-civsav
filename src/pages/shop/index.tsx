import React, { Fragment } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Seo from '@/components/seo';
import Layout from '@/components/layout';
import Product from '@/components/global/product';

export default function Shop({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products, menu } = data;
  return (
    <Fragment>
      <Seo title='Shop' />
      <Layout menu={menu.menuItems.edges}>
        <div className='px-4 py-7 mb-7'>
          {!error && products.edges.length && (
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
              {products.edges.map(({ node }: { node: any }, index: number) => (
                <div key={index} className='mx-auto'>
                  <Product
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
      </Layout>
    </Fragment>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await client.query({
    query: gql`
      query {
        menu(id: "67", idType: DATABASE_ID) {
          databaseId
          id
          locations
          name
          slug
          menuItems(first: 100) {
            edges {
              node {
                path
                title
                label
                childItems(first: 30)  {
                  edges {
                    node {
                      label
                      title
                      path
                      childItems(first: 30)  {
                        edges {
                          node {
                            label
                            title
                            path
                            childItems(first: 30)  {
                              edges {
                                node {
                                  label
                                  title
                                  path
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        products(
          where: { status: "publish", orderby: { field: DATE, order: DESC } }
          first: 36
        ) {
          edges {
            node {
              name
              featured
              reviewCount
              slug
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
