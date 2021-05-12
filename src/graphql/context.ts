import { PrismaClient } from '@prisma/client'

if (!process.env.APP_SECRET) {
  throw new Error('APP_SECRET env is not defined')
}

const APP_SECRET = process.env.APP_SECRET
const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient,
  APP_SECRET: string
}

export function createContext(): Context {
  return { prisma,APP_SECRET }
}