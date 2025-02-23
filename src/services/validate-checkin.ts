import { CheckInRepository } from '@/repositories/check-in-repository'
import { ResourceNotFount } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { ItIsNotPossibleValidatedCheckinAfterTwentyMinutes } from './errors/not-possible-validated-checkin-after-twenty-minutes'

interface ValidateCheckinServiceParams {
  checkinId: string
}

export class ValidateCheckinService {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({ checkinId }: ValidateCheckinServiceParams) {
    const checkIn = await this.checkInRepository.findCheckInById(checkinId)

    if (!checkIn) {
      throw new ResourceNotFount()
    }
    const distanceInMinutes = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutes > 20) {
      throw new ItIsNotPossibleValidatedCheckinAfterTwentyMinutes()
    }
    checkIn.validated_at = new Date()
    const validatedCheckin = await this.checkInRepository.saveCheckin(checkIn)
    return validatedCheckin
  }
}
