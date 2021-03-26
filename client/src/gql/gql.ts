import { ApolloClient, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // так создаю локальную переменную
                isLoggedIn() {
                    return isLoggedInVar();
                },
            },
        },
    },
});

export const isLoggedInVar = cache.makeVar<boolean>(true);

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`;

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql',
    headers: {
        // authorization: localStorage.getItem('token') || '',
        'client-name': 'Max',
        'client-version': '1.0.0',
    },
    typeDefs,
    resolvers: {},
});
