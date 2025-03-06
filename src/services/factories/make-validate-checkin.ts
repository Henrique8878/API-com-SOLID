import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { ValidateCheckinService } from '../validate-checkin'

export function MakeValidateCheckin() {
  const checkinRepository = new PrismaCheckinRepository()
  const validateCheckinService = new ValidateCheckinService(checkinRepository)
  return validateCheckinService
}
