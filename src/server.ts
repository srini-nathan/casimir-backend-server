import { ApolloServer } from 'apollo-server'
import { schema } from './graphql/schema'
import { createContext } from './graphql/context'
import depthLimit from 'graphql-depth-limit';

const PORT_NUMBER = process.env.TS_NODE_DEV === 'true'
  ? 3032 // for dev & test
  : 3003 // for production (must be absolute)

const port: number = PORT_NUMBER

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    headers: req.headers,
    ...createContext()
  }),
  playground: {
    endpoint: '/playground',
  },
  validationRules: [depthLimit(7)],
})

server.listen({ port: port }, () => {
  console.log(`Apollo-Nexus-Prisma ready at: http://localhost:${port}`)
})


// "dev": "ts-node src/server.ts", // without nodemon
// "build": "tsc -p . && ncp src/schema dist/schema",