import { User } from ".prisma/client"
import { FieldResolver } from "nexus"
import { Context } from "../../../context"
import jwt from 'jsonwebtoken'

export type AuthTokenData = {
  tokenId: string;
}


export const createToken: FieldResolver<'Mutation', 'createToken'> = async (
  _,
  args,
  ctx
) => {

  let success = false
  const message = ''

  const { username } = args.data || {}

  const user = await ctx.prisma.user.findUnique({
    where: { username }
  })
if(!user) {
  return {
    success,
    message:"user does not exists",
    errors:[],
    token:""

  }
}

  const Token = await ctx.prisma.token.create({
    data: {
      User: {
        connect: {
          id: user?.id
        }
      }
    }
  })

  const tokenData: AuthTokenData = {
    tokenId: Token.id
  }

  const token = jwt.sign(tokenData, ctx.APP_SECRET)


  return {
    success: !!user,
    errors: [],
    token,
  }
}