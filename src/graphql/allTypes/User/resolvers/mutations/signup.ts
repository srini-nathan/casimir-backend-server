import { FieldResolver } from "nexus"
import bcrypt from 'bcryptjs'
import { ApiFeedbackEnum } from "../../../ApiFeedback"


export const createPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}
export const signup: FieldResolver<'Mutation', 'signup'> = async (
  _,
  args,
  ctx
) => {
  const { password: passwordProps, ...data } = args.data || {}


  const password = await createPassword(passwordProps)

  const user = await ctx.prisma.user.create({
    data: {
      ...data,
      password,
    },
  })

  return { feedback: ApiFeedbackEnum.SUCCESS }

}