import { test, expect, describe } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'

describe('Test Register Seervice', () => {
  test('User password must be hashed', async () => {
    const registerServcie = new RegisterService({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerServcie.execute({
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('It should not be allowed to create a user with an existing email address.', async () => {
    const MemoryRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(MemoryRepository)

    await registerService.execute({
      name: 'Henrique',
      email: 'henriquetomazparticularr@gmail.com',
      password: '123456',
    })

    expect(() =>
      registerService.execute({
        name: 'Henrique',
        email: 'henriquetomazparticularr@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
