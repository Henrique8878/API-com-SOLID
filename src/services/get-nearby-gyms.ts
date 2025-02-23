import { GymRepository } from '@/repositories/gym-repository'

interface NearbyGysServiceParams {
  userLatitude: number
  userLongitude: number
}

export class NearbyGymsService {
  constructor(private gymRepository: GymRepository) {}

  async execute({ userLatitude, userLongitude }: NearbyGysServiceParams) {
    const nearbyGyms = await this.gymRepository.findManyNearbyGyms(
      userLatitude,
      userLongitude,
    )

    if (!nearbyGyms) {
      return null
    }

    return {
      nearbyGyms,
    }
  }
}
