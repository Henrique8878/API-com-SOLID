import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { GetListGymsService } from '../get-list-gyms'

export function MakeGetListGyms() {
  const prismaGymRepository = new PrismaGymRepository()
  const getListGyms = new GetListGymsService(prismaGymRepository)
  return getListGyms
}
