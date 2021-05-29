import { ExecutionParams } from '@graphql-tools/delegate'
import { fetch } from 'cross-fetch'
import { ExecutionResult, print } from 'graphql'

export const makeRemoteExecutor = (url: string) => {
  return async ({
    document,
    variables,
    context,
  }: ExecutionParams): Promise<ExecutionResult> => {
    const query = print(document)
    const fetchResult = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: context?.authorization,
      },
      body: JSON.stringify({ query, variables }),
    })

    return fetchResult.json()
  }
}
