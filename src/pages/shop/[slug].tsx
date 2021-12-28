import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import React, { Fragment, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
// import Seo from '@/components/seo';
import Layout from '@/components/layout';
import Product from '@/components/global/product';
import Accordion from '@/components/global/accordion';
import BreadCrumb from '@/components/global/breadcrumb';

export default function ShopPages({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { page } = data;

  const [topContent, setTopContent] = useState('');
  const [remainingContent, setContent] = useState<any>(null);
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const [accordTitle, setAccordionTitle] = useState<any>([]);
  const [accordContent, setAccordionContent] = useState<any>([]);
  const [pageTitle, setPageTitle] = useState<string>('');

  useEffect(() => {
    setAccordionTitle([]);
    setAccordionTitle([]);
    const contents = `${page?.content}`;
    const snippet = document.createElement('div');
    snippet.innerHTML = contents;
    const mainDiv = snippet.querySelector('.panel-layout');
    const childDivs = mainDiv?.querySelectorAll('.panel-grid');
    const title = mainDiv?.getElementsByTagName('h1');
    setPageTitle(title![0].innerHTML);
    const isUl = childDivs![0].getElementsByTagName('ul');
    if (isUl.length === 0) {
      setTopContent(childDivs![0].innerHTML);
    }
    const list: any = [];
    childDivs?.forEach((item, i) => {
      if (i !== 0 && i !== 1) {
        const accord = item.querySelector('.kt-accordion');
        if (accord) {
          const secTitle = item.getElementsByTagName('h2');
          setSectionTitle(secTitle[0].innerHTML);
          const title = Array.from(accord.getElementsByTagName('h5'));
          const content = Array.from(accord.getElementsByTagName('p'));
          const accTitles: any = [];
          const accContent: any = [];
          title?.forEach((t) => {
            accTitles.push(t.innerHTML.replace(/<[^>]+>/g, ''));
          });
          content?.forEach((t) => {
            const ans = t.innerHTML.replace(/<[^>]+>/g, '');
            accContent.push(ans.replaceAll('\n', ''));
          });
          setAccordionTitle(accTitles);
          setAccordionContent(accContent);
        } else {
          list.push(item.innerHTML);
        }
      }
    });
    setContent(list);
  }, [page.content]);
  return (
    <Fragment>
      {/* <Seo title={page.title} /> */}
      <Layout>
        <div className='pt-24 lg:pt-36'>
          <div className='px-4 mb-7'>
            <BreadCrumb
              pageList={[{ label: 'shop', path: '/shop' }]}
              currentPageLabel={pageTitle}
            />
          </div>
          <div className='pb-14 md:hidden'>
            {page.productCategory.productsCategory &&
              page.productCategory.productsCategory.products.edges.length && (
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
                  {page.productCategory.productsCategory.products.edges.map(
                    ({ node }: { node: any }, index: number) => (
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
                          shippingClass={
                            node.shippingClasses?.edges[0]?.node.slug
                          }
                          taxClass={node.taxClass}
                          taxtStatus={node.taxStatus}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
          <div className='px-4 py-7 mb-7'>
            <div
              className='px-8 xs:px-0 entry-content max-w-none font-heading shop-panel'
              dangerouslySetInnerHTML={{ __html: topContent }}
            />
          </div>
          <div className='hidden pb-14 md:block'>
            {page.productCategory.productsCategory &&
              page.productCategory.productsCategory.products.edges.length && (
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5'>
                  {page.productCategory.productsCategory.products.edges.map(
                    ({ node }: { node: any }, index: number) => (
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
                          shippingClass={
                            node.shippingClasses?.edges[0]?.node.slug
                          }
                          taxClass={node.taxClass}
                          taxtStatus={node.taxStatus}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
          <div className='px-4 py-7 mb-7'>
            {remainingContent?.map((item: any) => (
              <div
                key={item}
                className='px-8 xs:px-0 entry-content max-w-none font-heading shop-panel'
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </div>
          <div className='px-4 py-7 mb-7'>
            <div className='max-w-[60%] mx-auto'>
              <div className='mb-10 text-center'>
                <h2 className='text-[32px] leading-[34px] font-bold font-heading'>
                  {sectionTitle}
                </h2>
              </div>
              <Accordion titles={accordTitle} content={accordContent} />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `/shop/${params?.slug}`;
  const { data } = await client.query({
    query: gql`
      query ($slug: ID!) {
        page(id: $slug, idType: URI) {
          title
          slug
          status
          content
          productCategory {
            productsCategory {
              name
              uri
              products(
                first: 24
                where: { orderby: { field: PRICE, order: DESC } }
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
  const pages = [
    'cbd-accessories-for-sale',
    'cbd-capsules-for-sale',
    'cbd-concentrates-for-sale',
    'cbd-gummies-for-sale',
    'cbd-hemp-flower-for-sale',
    'cbd-joints-for-sale',
    'cbd-kief-joints-for-sale',
    'cbd-moon-rocks-for-sale',
    'cbd-pet-tinctures-for-sale',
    'cbd-tincture-for-sale',
    'cbd-topicals-for-sale',
    'cbd-vaporizers-for-sale',
    'cbg-products-for-sale',
    'delta-8-thc-products-for-sale',
  ];

  const paths = pages.map((item: string) => ({
    params: { slug: item },
  }));

  return {
    paths,
    fallback: 'blocking', //indicates the type of fallback
  };
};
