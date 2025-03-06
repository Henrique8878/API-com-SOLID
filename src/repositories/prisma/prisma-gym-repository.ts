import { Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GymRepository } from '../gym-repository'

export class PrismaGymRepository implements GymRepository {
  async findById(GymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: GymId,
      },
    })

    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    const Gym = await prisma.gym.create({
      data,
    })
    return Gym
  }

  async findManyGymsByUserId(title: string, page: number) {
    const ManyGyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    if (!ManyGyms) {
      return null
    }
    return ManyGyms
  }

  async findManyNearbyGyms(latitude: number, longitude: number) {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
    return gyms
  }
}
