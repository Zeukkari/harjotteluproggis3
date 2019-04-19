import Express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema,
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'

const API_URL = 'https://rata.digitraffic.fi/api/v1/graphql/graphiql'

async function run() {
  const createRemoteSchema = async uri => {
    const link = new HttpLink({ uri: uri, fetch })
    const schema = await introspectSchema(link)
    return makeRemoteExecutableSchema({
      schema,
      link,
    })
  }
  const executableDigitrafficSchema = await createRemoteSchema(API_URL)

  const finalSchema = mergeSchemas({
    schemas: [executableDigitrafficSchema],
  })

  const app = new Express()

  app.use(morgan('combined'))
  app.use(cors())
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema: finalSchema }),
  )

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  app.listen(8080)
  console.log(
    'Server running. Open http://localhost:8080/graphiql to run queries.',
  )
}

try {
  run()
} catch (e) {
  console.log(e, e.message, e.stack)
}
