import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './components/App'

import 'tachyons'
import './index.css'

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql',
})

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'cors',
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Fragment>
      <App />
    </Fragment>
  </ApolloProvider>,
  document.getElementById('root'),
)
