import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Description from '@/components/productDetail/description';
import Detail from '@/components/productDetail/details';
import ProductReviews from '@/components/productDetail/reviews';
import ProductsSlider from '@/components/global/productsSlider';
import Instagram from '@/components/global/instagram';

export default function SingleProduct({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { product, menu } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='max-w-[1330px] mx-auto'>
        <div className='px-6 mb-20 xs:mb-10'>
          <div className='flex flex-col-reverse space-y-10 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-10'>
            <Description product={product} />
            <Detail product={product} />
          </div>
        </div>
        <ProductReviews
          reviews={product.reviews.edges}
          reviewCount={product.reviewCount}
        />
      </div>
      {product.related.edges.length > 0 && (
        <ProductsSlider
          title='you may also like'
          items={product.related.edges}
        />
      )}
      <Instagram />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params!.slug;
  const { data } = await client.query({
    query: gql`
      query ($slug: ID!) {
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
                childItems {
                  edges {
                    node {
                      label
                      title
                      path
                      childItems {
                        edges {
                          node {
                            label
                            title
                            path
                            childItems {
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
        product(id: $slug, idType: SLUG) {
          name
          averageRating
          description(format: RENDERED)
          slug
          shortDescription(format: RENDERED)
          sku
          galleryImages {
            edges {
              node {
                mediaItemUrl
              }
            }
          }
          image {
            mediaItemUrl
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
          productCategories {
            edges {
              node {
                name
                slug
              }
            }
          }
          type
          reviewCount
          reviews(first: 10) {
            edges {
              node {
                content
                author {
                  node {
                    name
                  }
                }
                approved
                date
              }
              rating
            }
            averageRating
          }
          reviewsAllowed
          ... on VariableProduct {
            id
            name
            stockQuantity
            stockStatus
            price(format: RAW)
          }
          ... on SimpleProduct {
            id
            name
            stockQuantity
            stockStatus
            price(format: RAW)
          }
          related(first: 25) {
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
      }
    `,
    variables: {
      slug,
    },
  });
  return { props: { data: data } };
};
