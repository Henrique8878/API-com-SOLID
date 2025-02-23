import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CheckInService } from '../checkin'

export function MakeCheckinService() {
  const prismaCheckinRepository = new PrismaCheckinRepository()
  const prismaGymRepository = new PrismaGymRepository()
  const checkinService = new CheckInService(
    prismaCheckinRepository,
    prismaGymRepository,
  )

  return checkinService
}
