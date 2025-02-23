import { GymRepository } from '@/repositories/gym-repository'
import { NotBeGymsWithThisName } from './errors/not-be-gyms-with-this-title'

interface GetListGymsServiceParams {
  title: string
  page: number
}

export class GetListGymsService {
  constructor(private gymRepository: GymRepository) {}

  async execute({ title, page }: GetListGymsServiceParams) {
    const listOfGyms = await this.gymRepository.findManyGymsByUserId(
      title,
      page,
    )

    if (!listOfGyms) {
      throw new NotBeGymsWithThisName()
    }

    return listOfGyms
  }
}
