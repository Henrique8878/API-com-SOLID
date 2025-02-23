import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findCheckInByUserIdAndDate(
    UserId: string,
    date: Date,
  ): Promise<CheckIn | null>
  findCheckInById(checkInId: string): Promise<CheckIn | null>
  findManyByUserId(UserId: string, page: number): Promise<CheckIn[] | null>
  countNumberCheckins(userId: string): Promise<number | null>
  saveCheckin(checkIn: CheckIn): Promise<CheckIn>
}
