import React, { Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Seo from '@/components/seo';
import Layout from '@/components/layout';
import BreadCrumb from '@/components/global/breadcrumb';

export default function AnalysisCertificate({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { page } = data;
  return (
    <Fragment>
      <Seo title={page.title} />
      <Layout>
        <div className='pt-24 lg:pt-36'>
          <div className='px-4 mb-7'>
            <BreadCrumb currentPageLabel='Certificates of Analysis' />
          </div>
          <div className='px-4 py-7 mb-7'>
            <div
              className='px-8 xs:px-0 entry-content max-w-none font-heading page-content'
              dangerouslySetInnerHTML={{ __html: page?.content }}
            />
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
