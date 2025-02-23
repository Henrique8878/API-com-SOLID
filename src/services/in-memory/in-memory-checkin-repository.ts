import { CheckInRepository } from '@/repositories/check-in-repository'
import { Prisma, CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async saveCheckin(checkIn: CheckIn) {
    const indexCheckin = await this.items.findIndex(
      (item) => checkIn.id === item.id,
    )
    if (indexCheckin >= 0) {
      this.items[indexCheckin] = checkIn
    }

    return checkIn
  }

  async findCheckInById(checkInId: string) {
    const checkin = this.items.find((item) => checkInId === item.id)

    if (!checkin) {
      return null
    }

    return checkin
  }

  async countNumberCheckins(userId: string): Promise<number | null> {
    const numberCheckins = this.items.reduce((accumulator, item) => {
      if (item.id === userId) {
        accumulator += 1
      }
      return accumulator
    }, 0)

    if (!numberCheckins) {
      return null
    }

    return numberCheckins
  }

  async findManyByUserId(UserId: string, page: number) {
    const listOfCheckins = this.items
      .filter((item) => item.id === UserId)
      .slice((page - 1) * 20, page * 20)

    if (!listOfCheckins) {
      return null
    }

    return listOfCheckins
  }

  async findCheckInByUserIdAndDate(UserId: string, date: Date) {
    const beginDate = dayjs(date).startOf('date')
    const endDate = dayjs(date).endOf('date')
    const isCheckin = this.items.find((checkin) => {
      const receivedDate = dayjs(checkin.created_at)
      const isOnSameDate =
        receivedDate.isAfter(beginDate) && receivedDate.isBefore(endDate)

      return checkin.id === UserId && isOnSameDate
    })

    if (!isCheckin) {
      return null
    }

    return isCheckin
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const CheckIn = {
      id: data.id !== undefined ? data.id : 'user-01',
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }

    this.items.push(CheckIn)
    return CheckIn
  }
}
