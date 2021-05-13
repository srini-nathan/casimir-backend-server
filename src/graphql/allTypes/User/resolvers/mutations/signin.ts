import { FieldResolver } from "nexus"
import bcrypt from 'bcryptjs'
import { ApiFeedbackEnum } from "../../../ApiFeedback"
import { enforceExists, enforce } from "../../../../../common/errors/enforce"
import { ErrorCodesEnum } from "../../../ErrorCodes"
import NotFoundError from "../../../../../common/errors/NotFoundError"
import { User } from ".prisma/client"
import ForbiddenError from "../../../../../common/errors/ForbiddenError"


export const createPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, user: User) => {
    return await bcrypt.compare(password, user.password)
    
}

export const signin: FieldResolver<'Mutation', 'signin'> = async (
    _,
    args,
    ctx
) => {
    const { password: passwordProps, username, ...data } = args.data || {}

    const user = await ctx.prisma.user.findUnique({ where: {  username } })
    enforceExists(user, ErrorCodesEnum.USER_DOES_NOT_EXISTS, NotFoundError);

    const isPasswordValid = await comparePassword(args.data.password, user)
    enforce(isPasswordValid, ErrorCodesEnum.LOGIN_FAILED_UNAUTHORIZED, ForbiddenError);
    
    return { feedback: ApiFeedbackEnum.SUCCESS }

}