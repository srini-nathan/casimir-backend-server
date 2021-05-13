import { createToken } from './resolvers/createToken'
import { objectType, extendType, inputObjectType, nonNull } from 'nexus'
import { NexusNonNullableTypes } from 'nexus/dist/core'

export const UserAuthDataInput = inputObjectType({
    name: 'UserAuthDataInput',
    definition(t) {
      t.nonNull.string('username')
    },
  })

export const AuthMutation = extendType({
    type: 'Mutation',
    definition: (t) => {
      t.nonNull.field('createToken', {
        description: 'Create Token',
        type: 'AuthPayload',
        args: {
          data: nonNull<NexusNonNullableTypes>(UserAuthDataInput),
        },
        resolve: createToken,
      })
    },
})

// export const AuthPayload = objectType({
//     name: 'AuthPayload',
//     description: 'response token object',
//     definition(t) {
//       t.nonNull.boolean('success')
//       t.string('message')
//       t.string('token')
//       t.nonNull.list.nonNull.field('errors', {
//         type: 'RequestError',
//       })
//     },
//   })

