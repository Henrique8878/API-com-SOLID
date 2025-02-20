import { CheckInRepository } from '@/repositories/check-in-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { ResourceNotFount } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from './utils/get-distance-gym-user'
import { MaximunDistanceExceeded } from './errors/maximum-distance-exceeded'
import { CheckinNotAllowedOnTheSameDay } from './errors/checkin-not-allowed-on-the-same-day'

interface checkInParams {
  userId: string
  gymId: string
  userLatitute: number
  userLongitude: number
}

export class CheckInService {
  constructor(
    private checkinRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({ userId, gymId, userLatitute, userLongitude }: checkInParams) {
    const isGym = await this.gymRepository.findById(gymId)
    if (!isGym) {
      throw new ResourceNotFount()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitute, longitude: userLongitude },
      {
        latitude: isGym.latitude.toNumber(),
        longitude: isGym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaximunDistanceExceeded()
    }
    const isCheckin = await this.checkinRepository.findCheckInByUserIdAndDate(
      userId,
      new Date(),
    )
    if (isCheckin) {
      throw new CheckinNotAllowedOnTheSameDay()
    }
    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
