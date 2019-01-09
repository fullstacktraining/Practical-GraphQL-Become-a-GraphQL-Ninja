import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  request: async operation => {
    const token = await localStorage.getItem('token');
    if (token) {
      operation.setContext({
        headers: {
          'x-auth-token': token
        }
      });
    } else {
      operation.setContext();
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
