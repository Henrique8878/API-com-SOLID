import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileService } from '../get-user-profile'

export function MakeGetUserProfile() {
  const prismaUserRepository = new PrismaUserRepository()
  const getUserProfile = new GetUserProfileService(prismaUserRepository)
  return getUserProfile
}
