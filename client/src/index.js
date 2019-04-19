import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './components/App'

import 'tachyons'
import './index.css'

const API_URL =
  process.env.API_URL || 'https://rata.digitraffic.fi/api/v1/graphql/graphiql'

const link = createHttpLink({
  uri: API_URL,
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
