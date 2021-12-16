import type { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { gql } from '@apollo/client';
import client from '@/config/apollo-client';
import Layout from '@/components/layout';

const SingleBlog: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { menu, post } = data;
  return (
    <Layout menu={menu.menuItems.edges}>
      <div className='px-4 md:px-24 py-14'>
        <div
          className='entry-content font-heading blog-content'
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params!.blog;
  const { data, error } = await client.query({
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
  return { props: { data: data, error: error || null }, revalidate: 60 };
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
    paths, //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export default SingleBlog;
