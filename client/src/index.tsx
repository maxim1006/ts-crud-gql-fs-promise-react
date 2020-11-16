import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/app/app.component';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from './gql/gql';
import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <App /> : <>Login Page</>;
}

ReactDOM.render(
    // <React.StrictMode>
    <Suspense fallback={'Loading...'}>
        <ApolloProvider client={client}>
            <IsLoggedIn />
        </ApolloProvider>
    </Suspense>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
