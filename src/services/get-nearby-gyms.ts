import { GymRepository } from '@/repositories/gym-repository'

interface NearbyGysServiceParams {
  latitude: number
  longitude: number
}

export class NearbyGymsService {
  constructor(private gymRepository: GymRepository) {}

  async execute({ latitude, longitude }: NearbyGysServiceParams) {
    const nearbyGyms = await this.gymRepository.findManyNearbyGyms(
      latitude,
      longitude,
    )

    if (!nearbyGyms) {
      return null
    }

    return {
      nearbyGyms,
    }
  }
}
