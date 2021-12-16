import React, { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
// import Seo from '@/components/seo';
import Layout from '@/components/layout';
import Product from '@/components/global/product';

export default function ShopPages({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, menu } = data;

  const [topContent, setTopContent] = useState('');

  useEffect(() => {
    const contents = `${page?.content}`;
    const snippet = document.createElement('div');
    snippet.innerHTML = contents;
    const mainDiv = snippet.querySelector('.panel-layout');
    const childDivs = mainDiv?.getElementsByTagName('div');
    const isUl = childDivs![0].getElementsByTagName('ul');
    // lastURL = links[links.length - 1].href; // or getAttribute("href")
    if (isUl.length === 0) {
      setTopContent(childDivs![0].innerHTML);
    }
  }, [page.content]);
  return (
    <Fragment>
      {/* <Seo title={page.title} /> */}
      <Layout menu={menu.menuItems.edges}>
        <div className='px-4 py-7 mb-7'>
          <div
            className='px-8 xs:px-0 entry-content max-w-none font-heading shop-panel'
            dangerouslySetInnerHTML={{ __html: topContent }}
          />
        </div>
        <div className='pb-14'>
          {page.productCategory.productsCategory &&
            page.productCategory.productsCategory.products.edges.length && (
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
                {page.productCategory.productsCategory.products.edges.map(
                  ({ node }: { node: any }, index: number) => (
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
                  )
                )}
              </div>
            )}
        </div>
      </Layout>
    </Fragment>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = `/shop/${params?.slug}`;
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
                childItems(first: 30) {
                  edges {
                    node {
                      label
                      title
                      path
                      childItems(first: 30) {
                        edges {
                          node {
                            label
                            title
                            path
                            childItems(first: 30) {
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
        page(id: $slug, idType: URI) {
          title
          slug
          status
          content
          productCategory {
            productsCategory {
              name
              uri
              products(first: 30) {
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
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return { props: { data: data } };
};
