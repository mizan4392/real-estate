import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors?.map(({ message, locations, path }) => {
      // toast.error(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
