import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticationDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('authorization', context.authorization);
  }
}
