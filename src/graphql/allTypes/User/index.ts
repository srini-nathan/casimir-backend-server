import { signup } from './resolvers/signup'
import { objectType, extendType, inputObjectType, nonNull } from 'nexus'
import { NexusNonNullableTypes } from 'nexus/dist/core'

export const UserSignupDataInput = inputObjectType({
    name: 'UserSignupDataInput',
    definition(t) {
      t.nonNull.string('username')
      t.nonNull.string('email')
      t.string('fullname')
      t.nonNull.string('password')
    },
  })

export const UserMutation = extendType({
    type: 'Mutation',
    definition: (t) => {
      t.nonNull.field('signup', {
        description: 'Register',
        type: 'Boolean',
        args: {
          data: nonNull<NexusNonNullableTypes>(UserSignupDataInput),
        },
        resolve: signup,
      })
    },
})

