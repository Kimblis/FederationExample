import { fetch } from 'cross-fetch'
import { print } from 'graphql'

export function makeRemoteExecutor(url) {
  return async ({ document, variables, context }) => {
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
