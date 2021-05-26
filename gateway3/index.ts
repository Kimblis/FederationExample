import waitOn from 'wait-on'
import { ApolloServer } from 'apollo-server'
import { introspectSchema } from '@graphql-tools/wrap'
import { stitchSchemas } from '@graphql-tools/stitch'

import { makeRemoteExecutor } from './utils/make_remote_executor'
import pubsub from './pubsub'

async function makeGatewaySchema() {
  const gatewayExec = makeRemoteExecutor('http://localhost:3002/graphql')

  return stitchSchemas({
    subschemas: [
      {
        schema: await introspectSchema(gatewayExec),
        executor: gatewayExec,
        batch: true,
      },
    ],
    typeDefs: `
    type Subscription {
      movieRetrieved: Movie!
      reviewsRetrieved: [Review]!
    }
    `,
    resolvers: {
      Subscription: {
        movieRetrieved: {
          resolve: (source, args, context, info) => {
            console.log(context)
            return source
          },
          subscribe: (source, args, context) => {
            return pubsub.asyncIterator('MOVIE_RETRIEVED')
          },
        },
        reviewsRetrieved: {
          resolve: (source, args, context) => {
            console.log(source)
            return source
          },
          subscribe: (source, args, context) => {
            return pubsub.asyncIterator('REVIEWS_RETRIEVED')
          },
        },
      },
    },
  })
}

waitOn({ resources: ['tcp:3002'] }, async () => {
  const schema = await makeGatewaySchema()
  const server = new ApolloServer({ schema }) // uses Apollo Server for its subscription UI features
  server
    .listen(4000)
    .then(() => console.log(`gateway running at http://localhost:4000/graphql`))
})
