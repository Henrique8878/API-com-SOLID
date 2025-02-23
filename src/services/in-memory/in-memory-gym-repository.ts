import { GymRepository } from '@/repositories/gym-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '../utils/get-distance-gym-user'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

  async findManyNearbyGyms(latitude: number, longitude: number) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async findManyGymsByUserId(
    title: string,
    page: number,
  ): Promise<Gym[] | null> {
    const titleGym = this.gyms
      .filter((gym) => gym.title.toLowerCase().includes(title.toLowerCase()))
      .slice((page - 1) * 20, page * 20)

    if (!titleGym) {
      return null
    }

    return titleGym
  }

  async findById(GymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === GymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = {
      id: data.id ? data.id : randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)
    return gym
  }
}
