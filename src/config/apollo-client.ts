import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `https://wordpress-700791-2317305.cloudwaysapps.com/graphql`,
  cache: new InMemoryCache(),
});

export default client;
