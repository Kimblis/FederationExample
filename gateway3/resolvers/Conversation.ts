import { delegateToSchema } from '@graphql-tools/delegate'
import { withFilter } from 'apollo-server'

import getGatewaySchema from '../utils/make_gateway_schema'
import pubsub from '../pubsub'

export default {
  newConversation: {
    selectionSet: `{ participants }`,
    resolve: async ({ newConversation }, _: unknown, context, info) => {
      return delegateToSchema({
        schema: await getGatewaySchema(),
        operation: 'query',
        fieldName: 'conversation',
        info,
        context,
        args: { conversationId: newConversation.id },
      })
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator('newConversation'),
      async ({ newConversation: { id } }, listenvalues, ctx) => {
        return true
      }
    ),
  },

  conversation: {
    resolve: async ({ conversation }, _: unknown, context, info) => {
      return delegateToSchema({
        schema: await getGatewaySchema(),
        operation: 'query',
        fieldName: 'conversation',
        info,
        context,
        args: { conversationId: conversation.id },
      })
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator('conversation'),
      async ({ conversation: { id } }, { conversationId }, ctx) => {
        return id === conversationId
      }
    ),
  },

  conversationLeft: {
    resolve: async ({ conversationLeft }, _: unknown, context, info) => {
      return delegateToSchema({
        schema: await getGatewaySchema(),
        operation: 'query',
        fieldName: 'conversation',
        info,
        context,
        args: { conversationId: conversationLeft.id },
      })
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator('conversationLeft'),
      async (payload, _, ctx) => {
        return true
      }
    ),
  },

  conversationMessage: {
    resolve: async ({ conversationMessage }, _: unknown, context, info) => {
      return delegateToSchema({
        schema: await getGatewaySchema(),
        operation: 'query',
        fieldName: 'conversationMessages',
        info,
        context,
        args: { conversationId: conversationMessage.conversationId },
      })
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator('conversationMessage'),
      async (payload, _, ctx) => {
        return true
      }
    ),
  },
}
