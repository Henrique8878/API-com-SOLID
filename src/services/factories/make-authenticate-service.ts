import { AuthenticateService } from '../authenticate'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeAuthenticateService() {
  const prismaRepository = new PrismaUserRepository()
  const authenticateService = new AuthenticateService(prismaRepository)

  return authenticateService
}
