import { useEffect } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import Hero from '@/components/homePage/hero';
import ProductsSlider from '@/components/global/productsSlider';
import WholeSale from '@/components/global/banner/wholeSale';
import Categories from '@/components/homePage/categories/old';
import Reviews from '@/components/homePage/reviews';
import Instagram from '@/components/global/instagram';

const Home: NextPage = ({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { products, menu, latest } = data;

  useEffect(() => {
    const sliders = document.querySelectorAll('.c-slide-in');
    const appearOptions = {
      threshold: 0,
      rootMargin: '0px 0px -250px 0px',
    };

    const appearOnScroll = new IntersectionObserver(function (
      entries,
      appearOnScroll
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    sliders.forEach((slider) => {
      appearOnScroll.observe(slider);
    });
  }, []);

  return (
    <Layout menu={menu.menuItems.edges}>
      <Hero />
      <Reviews />
      {!error && products.edges.length && (
        <ProductsSlider title='Featured Products' items={products.edges} />
      )}
      <Categories isMasonry title='Categories' />
      {latest.edges.length && (
        <ProductsSlider title='Latest Products' items={latest.edges} />
      )}
      <WholeSale />
      <Categories />
      <Instagram />
    </Layout>
  );
};

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
        products(
          where: {
            status: "publish"
            orderby: { field: DATE, order: DESC }
            featured: true
          }
          first: 25
        ) {
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
        latest: products(
          where: { status: "publish", orderby: { field: DATE, order: DESC } }
          first: 15
        ) {
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
export default Home;
