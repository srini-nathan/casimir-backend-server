import { signup } from './resolvers/mutations/signup'
import { objectType, extendType, inputObjectType, nonNull } from 'nexus'
import { NexusNonNullableTypes } from 'nexus/dist/core'
import { signin } from './resolvers/mutations/signin'
import { me } from './resolvers/queries/me'

export const User = objectType({
  name: "User",
  definition(t) {
      t.nonNull.string('id')
      t.nonNull.date('createdAt', {
          description: 'When Created',
      })
      t.nonNull.date('updatedAt', {
          description: 'When Updated',
      })
      t.string('email')
      t.string('fullname')
      t.string('username')
  }
})

export const UserSignupDataInput = inputObjectType({
  name: 'UserSignupDataInput',
  definition(t) {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.string('fullname')
    t.nonNull.string('password')
  },
})

export const UserSiginDataInput = inputObjectType({
  name: 'UserSiginDataInput',
  definition(t) {
    t.nonNull.string('username')
    t.nonNull.string('password')
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('signup', {
      description: 'Register',
      type: 'AuthPayload',
      args: {
        data: nonNull<NexusNonNullableTypes>(UserSignupDataInput),
      },
      resolve: signup,
    })

    t.nonNull.field('signin', {
      description: "Login",
      type: 'AuthPayload',
      args: {
        data: nonNull<NexusNonNullableTypes>(UserSiginDataInput),
      },
      resolve: signin,
    })
  },
})

export const userQuery = extendType({
  type:"Query",
  definition:(t) => {
    t.field('me',{
      type:"User",
      resolve:me
    })
  }
})


