import { introspectSchema } from '@graphql-tools/wrap'

import { makeRemoteExecutor } from './make_remote_executor'

let gatewaySchema

const makeGatewaySchema = async () => {
  const executor = makeRemoteExecutor('http://localhost:3002/graphql')
  // @ts-ignore
  const schema = await introspectSchema(executor)

  return {
    schema,
    executor,
    batch: true,
  }
}

export default async () => {
  if (!gatewaySchema) {
    gatewaySchema = await makeGatewaySchema()
  }

  return gatewaySchema
}
