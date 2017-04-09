
import express from 'express'

import Schema from './data/schema'
import Resolvers from './data/resolvers'
// import Connectors from './data/connectors'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import bodyParser from 'body-parser'

const GRAPHQL_PORT = 8081

const graphQLServer = express()

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

addMockFunctionsToSchema({
  schema: executableSchema,
  preserveResolvers: true
})

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {}
}))

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
))
