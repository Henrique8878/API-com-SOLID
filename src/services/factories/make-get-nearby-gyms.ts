import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { NearbyGymsService } from '../get-nearby-gyms'

export function MakeGetListNearbyGyms() {
  const prismaGymrepository = new PrismaGymRepository()
  const getListNearbyGyms = new NearbyGymsService(prismaGymrepository)
  return getListNearbyGyms
}
