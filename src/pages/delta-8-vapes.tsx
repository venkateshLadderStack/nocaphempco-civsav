import React, { Fragment, useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
// import Seo from '@/components/seo';
import Layout from '@/components/layout';
import Product from '@/components/global/product';
import Accordion from '@/components/global/accordion';
import BreadCrumb from '@/components/global/breadcrumb';

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { page } = data;

  const [topContent, setTopContent] = useState('');
  const [remainingContent, setContent] = useState<any>(null);
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const [accordTitle, setAccordionTitle] = useState<any>([]);
  const [accordContent, setAccordionContent] = useState<any>([]);
  // const [pageTitle, setPageTitle] = useState<string>('');

  useEffect(() => {
    setAccordionTitle([]);
    setAccordionTitle([]);
    const contents = `${page?.content}`;
    const snippet = document.createElement('div');
    snippet.innerHTML = contents;
    const mainDiv = snippet.querySelector('.panel-layout');
    const childDivs = mainDiv?.querySelectorAll('.panel-grid');
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
              currentPageLabel='Delta 8 Vapes'
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
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        page(id: "delta-8-vapes", idType: URI) {
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
  });
  return { props: { data: data } };
};
