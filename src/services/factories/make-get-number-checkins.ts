import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { GetNumberCheckinsService } from '../get-number-checkins'

export function MakeGetNumberCheckins() {
  const prismaCheckinRepository = new PrismaCheckinRepository()
  const getNumberCheckins = new GetNumberCheckinsService(
    prismaCheckinRepository,
  )
  return getNumberCheckins
}
