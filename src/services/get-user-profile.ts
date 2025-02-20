import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFount } from './errors/resource-not-found'

interface getUserProfileParams {
  id: string
}

interface GetUserReturn {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: getUserProfileParams): Promise<GetUserReturn> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFount()
    }

    return {
      user,
    }
  }
}
