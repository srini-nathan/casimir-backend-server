import { FieldResolver } from "nexus"
import { Context } from "../../../context"
import jwt from 'jsonwebtoken'
import { ErrorCodesEnum } from "../../ErrorCodes"
import NotFoundError from "../../../../common/errors/NotFoundError"
import { enforceExists } from "../../../../common/errors/enforce"
import { ApiFeedbackEnum } from "../../ApiFeedback"

export type AuthTokenData = {
  tokenId: string;
}


export const createToken: FieldResolver<'Mutation', 'createToken'> = async (
  _,
  args,
  ctx
) => {

  const { username } = args.data || {}

  const user = await ctx.prisma.user.findUnique({
    where: { username }
  })

  enforceExists(user, ErrorCodesEnum.USER_DOES_NOT_EXISTS, NotFoundError);


  const token = await ctx.prisma.token.create({
    data: {
      User: {
        connect: {
          id: user?.id
        }
      }
    }
  })

  const tokenData: AuthTokenData = {
    tokenId: token.id
  }

  const appToken = jwt.sign(tokenData, ctx.APP_SECRET)


  return {
    token: appToken,
    feedback: ApiFeedbackEnum.SUCCESS
  };
}