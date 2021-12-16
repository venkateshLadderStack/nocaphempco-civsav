import type { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Masonry from 'react-masonry-css';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';
import BlogPost from '@/components/blog/post';

const breakpointColumnsObj = {
  default: 4,
  1799: 3,
  1499: 2,
  767: 1,
};

const Blog: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { menu, posts } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
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
