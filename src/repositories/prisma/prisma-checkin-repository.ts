import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckinRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  async findCheckInByUserIdAndDate(UserId: string, date: Date) {
    const beginDate = dayjs(date).startOf('date')
    const endDate = dayjs(date).endOf('date')

    const CheckInIsSameDay = await prisma.checkIn.findFirst({
      where: {
        user_id: UserId,
        created_at: {
          gte: beginDate.toDate(),
          lte: endDate.toDate(),
        },
      },
    })

    return CheckInIsSameDay
  }

  async findCheckInById(checkInId: string) {
    const isCheckin = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    return isCheckin
  }

  async findManyByUserId(UserId: string, page: number) {
    const ManyCheckins = await prisma.checkIn.findMany({
      where: {
        user_id: UserId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return ManyCheckins
  }

  async countNumberCheckins(userId: string) {
    const UserCheckins = prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
    })

    const numberCheckins = (await UserCheckins).reduce(
      (accumulator, checkIn) => {
        if (checkIn) {
          accumulator += 1
        }
        return accumulator
      },
      0,
    )

    return numberCheckins
  }

  async saveCheckin(checkIn: CheckIn) {
    const checkin = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })

    return checkin
  }
}
