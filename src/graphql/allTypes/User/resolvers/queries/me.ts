import { FieldResolver } from "nexus";
import { enforceExists } from "../../../../../common/errors/enforce";
import ForbiddenError from "../../../../../common/errors/ForbiddenError";
import { ErrorCodesEnum } from "../../../ErrorCodes";

export const me: FieldResolver<'Query', 'me'> = async (
    _,
    _args,
    ctx
) => {

    const userId = ctx.currentUser?.id
    enforceExists(userId, ErrorCodesEnum.INVALID_USER, ForbiddenError)

    return ctx.prisma.user.findUnique({ where: { id: userId } })
}