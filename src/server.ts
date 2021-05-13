import { ApolloServer } from 'apollo-server'
import { schema } from './graphql/schema'
import { Context, createContext } from './graphql/context'
import depthLimit from 'graphql-depth-limit';
import jwt from 'jsonwebtoken'
import { AuthTokenData } from './graphql/allTypes/Auth/resolvers/createToken';

const PORT_NUMBER = process.env.TS_NODE_DEV === 'true'
  ? 3032 // for dev & test
  : 3003 // for production (must be absolute)

const port: number = PORT_NUMBER

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let currentUser: Context['currentUser'] = null

    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace(
          'Bearer ',
          ''
        )

        const tokenData = jwt.verify(
          token,
          createContext().APP_SECRET
        ) as AuthTokenData | null

        if (tokenData?.tokenId) {
          const Token = await createContext().prisma.token.findUnique({
            where: { id: tokenData.tokenId }, select: { id: true, expiredAt: true, User: true }
          })

          if (
            Token &&
            (!Token.expiredAt || new Date(Token.expiredAt) > new Date())
          ) { currentUser = Token.User }
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      ...createContext(),
      currentUser
    }
  },
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