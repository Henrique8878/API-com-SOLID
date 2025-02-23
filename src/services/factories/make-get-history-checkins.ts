import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { GetHistoryCheckinsUserService } from '../get-history-checkins-user'

export function MakeHistoryCheckins() {
  const prismaCheckinRepository = new PrismaCheckinRepository()
  const getHistoryCheckin = new GetHistoryCheckinsUserService(
    prismaCheckinRepository,
  )
  return getHistoryCheckin
}
