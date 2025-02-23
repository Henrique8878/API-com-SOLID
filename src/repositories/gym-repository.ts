import { Gym, Prisma } from '@prisma/client'

export interface GymRepository {
  findById(GymId: string): Promise<Gym | null>
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
  findManyGymsByUserId(title: string, page: number): Promise<Gym[] | null>
  findManyNearbyGyms(latitude: number, longitude: number): Promise<Gym[] | null>
}
