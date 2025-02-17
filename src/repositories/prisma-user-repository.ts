// repository que, aqui sim eu utilizo o prisma, separando totalmente da camada de service e controlles. e se um dia eu necessitar trocar de banco de dados, a manutenção fica bem mais fácil.

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from './users-repository'

export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string) {
    const isEmailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return isEmailExists
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
