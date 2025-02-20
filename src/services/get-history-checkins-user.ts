import { CheckInRepository } from '@/repositories/check-in-repository'

interface GetHistoryCheckinsUserServiceParams {
  userId: string
  page: number
}

export class GetHistoryCheckinsUserService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({ userId, page }: GetHistoryCheckinsUserServiceParams) {
    const listOfCheckins = await this.checkinRepository.findManyByUserId(
      userId,
      page,
    )

    if (!listOfCheckins) {
      throw new Error()
    }

    return listOfCheckins
  }
}
