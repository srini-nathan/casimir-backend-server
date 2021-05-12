import { makeSchema,fieldAuthorizePlugin } from 'nexus'
import * as types from './allTypes'
import { nexusPrisma } from 'nexus-plugin-prisma'

const shouldGenerateArtifacts =
  process.env.NODE_ENV === "development" || process.env.GENERATE === "true";

export const schema = makeSchema({
    types: types,
    outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    plugins: [
        nexusPrisma({ shouldGenerateArtifacts, experimentalCRUD: true }),
        fieldAuthorizePlugin(),
      ],
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [{
            module: '@prisma/client',
            alias: 'prisma',
        },
        ],
    },
})