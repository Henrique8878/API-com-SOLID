import { CheckInRepository } from '@/repositories/check-in-repository'
import { NotCheckinUSer } from './errors/not-checkin-user'

interface GetNumberCheckinsServiceParams {
  userId: string
}

export class GetNumberCheckinsService {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({ userId }: GetNumberCheckinsServiceParams) {
    const numberCheckins =
      await this.checkinRepository.countNumberCheckins(userId)
    if (!numberCheckins) {
      throw new NotCheckinUSer()
    }

    return numberCheckins
  }
}
