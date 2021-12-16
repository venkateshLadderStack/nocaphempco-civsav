import React, { Fragment } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Seo from '@/components/seo';
import Layout from '@/components/layout';

export default function AnalysisCertificate({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, menu } = data;
  return (
    <Fragment>
      <Seo title={page.title} />
      <Layout menu={menu.menuItems.edges}>
        <div className='px-4 py-7 mb-7'>
          <div
            className='px-8 xs:px-0 entry-content max-w-none font-heading page-content'
            dangerouslySetInnerHTML={{ __html: page?.content }}
          />
        </div>
      </Layout>
    </Fragment>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
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
        page(id: "certificates-of-analysis", idType: URI) {
          title
          slug
          status
          content
        }
      }
    `,
  });
  return { props: { data: data } };
};
