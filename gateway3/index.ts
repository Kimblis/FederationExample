import waitOn from 'wait-on'
import { ApolloServer } from 'apollo-server'
import { stitchSchemas } from '@graphql-tools/stitch'

import ConversationSubscriptions from './resolvers/Conversation'
import getGatewaySchema from './utils/make_gateway_schema'

async function stitchGatewaySchema(gatewaySchema: any) {
  return stitchSchemas({
    // @ts-ignore
    subschemas: [gatewaySchema],
    typeDefs: `
    type Subscription {
    meeting(meetingId: UUID!): Meeting!
    newMeeting(status: [MeetingCallStatusEnum!]!): Meeting!
    meetingLeft: Meeting!
    meetingMessage(meetingId: UUID!): MeetingMessage!
    conversation(conversationId: UUID!): Conversation!
    newConversation: Conversation!
    conversationLeft: Conversation!
    conversationMessage(conversationId: UUID!): ConversationMessage!
    waitingListStatus(meetingId: UUID!): WaitingListParticipantStatusPayload!
    meetingJoinRequest(meetingId: UUID!): MemberUnion!
    avatarUploadSuccess: User!
    avatarUploadError: AvatarUploadErrorPayload!
    }
    `,
    resolvers: {
      Subscription: {
        ...ConversationSubscriptions,
      },
    },
  })
}

waitOn({ resources: ['tcp:3002'] }, async () => {
  const gatewaySchema = await getGatewaySchema()
  const schema = await stitchGatewaySchema(gatewaySchema)
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ authorization: req?.headers.authorization }),
  })
  server
    .listen(4000)
    .then(() => console.log(`gateway running at http://localhost:4000/graphql`))
})
