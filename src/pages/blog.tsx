import type { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Masonry from 'react-masonry-css';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import BlogPost from '@/components/blog/post';
import BreadCrumb from '@/components/global/breadcrumb';

const breakpointColumnsObj = {
  default: 4,
  1799: 3,
  1499: 2,
  767: 1,
};

const Blog: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { posts } = data;
  return (
    <Layout>
      <div className='px-4'>
        <BreadCrumb currentPageLabel='Blog' />
      </div>
      <div className='px-4 py-14'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='nocaphemp-masonry-grid'
          columnClassName='nocaphemp-masonry-grid_column'
        >
          {posts.edges.map(({ node }: { node: any }) => (
            <BlogPost
              title={node.title}
              thumbnail={node.featuredImage.node.mediaItemUrl}
              slug={node.slug}
              excerpt={node.excerpt}
              key={node.title}
            />
          ))}
        </Masonry>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await client.query({
    query: gql`
      query {
        posts(first: 50) {
          edges {
            node {
              excerpt
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
        }
      }
    `,
  });
  return { props: { data: data, error: error || null }, revalidate: 60 };
};

export default Blog;
