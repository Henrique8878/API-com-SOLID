import { GymRepository } from '@/repositories/gym-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

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
