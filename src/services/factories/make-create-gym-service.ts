import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CreateGymService } from '../create-gym'

export function MakeCreateGymService() {
  const prismaGymRepository = new PrismaGymRepository()
  const createGymService = new CreateGymService(prismaGymRepository)
  return createGymService
}
