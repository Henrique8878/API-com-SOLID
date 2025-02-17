// Já na camada service eu lido com toda parte de manipulação das regras de negócios, intermedio com o banco de dados. Inclusive, é recomendado Utilizar a service como uma classe para que, os repositorys, não sejam dependentes de apenas uma biblioteca, então eu transformo a service em uma classe, adiciono um método constructor nela e passo o/os repositorys como parametro e utilizo eles na service de forma genérica, para que, se algum dia eu tenha necessidade de udar o banco de dados ou o local de armazenagem de dados, eu não precise mudar todo o meu código.Outra coisa legal de fazer é tentar tipar essas variáveis, parametros e funções que vem do repository, criando um interface contract, para tipar o que vem de funções/ métodos e variáveis dos repositorys, deixando minha intellisense mais fluida e intuitiva.
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'
import { User } from '@prisma/client'

interface ParamsDataUser {
  name: string
  email: string
  password: string
}

interface ReturningUserRepository {
  user: User
}

export class RegisterService {
  constructor(private UsersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ParamsDataUser): Promise<ReturningUserRepository> {
    const password_hash = await hash(password, 6)

    const usersWithSameEmail = await this.UsersRepository.findByEmail(email)

    if (usersWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const user = await this.UsersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
