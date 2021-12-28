import type { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import BreadCrumb from '@/components/global/breadcrumb';

const SingleBlog: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { post } = data;
  return (
    <Layout>
      <div className='pt-24 lg:pt-36'>
        <div className='px-4 md:px-20'>
          <BreadCrumb
            pageList={[{ label: 'blog', path: '/blog' }]}
            currentPageLabel={post.title}
          />
        </div>
        <div className='px-4 md:px-24 py-14'>
          <div
            className='entry-content font-heading blog-content'
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params!.blog;
  const { data, error } = await client.query({
    query: gql`
      query ($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          content
          slug
          title
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return { props: { data: data, error: error || null }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths<{ blog: string }> = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        posts(first: 50) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `,
  });

  const paths = data.posts.edges.map(({ node }: { node: any }) => ({
    params: { blog: node?.slug },
  }));

  return {
    paths,
    fallback: 'blocking', //indicates the type of fallback
  };
};

export default SingleBlog;
