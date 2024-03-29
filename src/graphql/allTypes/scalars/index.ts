import { GraphQLScalarType } from 'graphql'
import {GraphQLDate} from 'graphql-iso-date'
import { asNexusMethod } from 'nexus'

export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  // serialize: (data: unknown) => data,
  serialize: (data: string | Record<string, unknown> | Array<unknown>) => {
    try {
      return data ? (typeof data === 'string' ? JSON.parse(data) : data) : null
    } catch (error) {
      console.error('JSONScalar parse error', error)
      return null
    }
  },
  parseValue: (data: unknown) => data,
})

export const GQLDate = asNexusMethod(GraphQLDate, 'date')