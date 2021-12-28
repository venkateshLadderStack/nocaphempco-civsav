import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Description from '@/components/productDetail/description';
import Detail from '@/components/productDetail/details';
import ProductReviews from '@/components/productDetail/reviews';
import ProductsSlider from '@/components/global/productsSlider';
import Instagram from '@/components/global/instagram';
import BreadCrumb from '@/components/global/breadcrumb';

export default function SingleProduct({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { product } = data;

  return (
    <Layout>
      <div className='pt-24 lg:pt-36'>
        <div className='px-4 mb-7'>
          <BreadCrumb
            pageList={[{ label: 'shop', path: '/shop' }]}
            currentPageLabel={product.name}
          />
        </div>
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
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params!.slug;
  const { data } = await client.query({
    query: gql`
      query ($slug: ID!) {
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
          shippingClasses {
            edges {
              node {
                name
                slug
              }
            }
          }
          reviewsAllowed
          ... on VariableProduct {
            id
            name
            stockQuantity
            stockStatus
            price(format: RAW)
            taxStatus
            taxClass
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
            variations(first: 100) {
              edges {
                node {
                  salePrice(format: RAW)
                  regularPrice(format: RAW)
                  price
                  name
                  link
                  attributes {
                    edges {
                      node {
                        name
                        label
                        value
                      }
                    }
                  }
                }
              }
            }
          }
          ... on SimpleProduct {
            id
            name
            stockQuantity
            stockStatus
            price(format: RAW)
            taxStatus
            taxClass
          }
          related(first: 25) {
            edges {
              node {
                name
                featured
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
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return { props: { data: data }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        products(first: 150) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
  });

  const paths = data.products.edges.map(({ node }: { node: any }) => ({
    params: { slug: node?.slug },
  }));

  return {
    paths,
    fallback: 'blocking', //indicates the type of fallback
  };
};
