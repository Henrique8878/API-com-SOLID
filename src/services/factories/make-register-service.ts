import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const prismaRepository = new PrismaUserRepository()
  const registerService = new RegisterService(prismaRepository)

  return registerService
}
