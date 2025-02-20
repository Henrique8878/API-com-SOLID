import { GymRepository } from '@/repositories/gym-repository'

interface CreateGymParams {
  id?: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymService {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymParams) {
    const gym = await this.gymRepository.create({
      id,
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return gym
  }
}
