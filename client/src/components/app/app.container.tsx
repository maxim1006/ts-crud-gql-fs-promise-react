import React, { Suspense } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '../../gql/gql';
import App from './app.component';

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN);
    return <App isLoggedIn={data.isLoggedIn} />;
}

export const AppContainer = () => (
    <Suspense fallback={'Loading...'}>
        <ApolloProvider client={client}>
            <IsLoggedIn />
        </ApolloProvider>
    </Suspense>
);
