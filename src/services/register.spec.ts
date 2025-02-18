import { test, expect, describe, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'

let MemoryRepository: InMemoryUsersRepository
let registerService: RegisterService

describe('Test Register Service', () => {
  beforeEach(() => {
    MemoryRepository = new InMemoryUsersRepository()
    registerService = new RegisterService(MemoryRepository)
  })
  test('User password must be hashed', async () => {
    const { user } = await registerService.execute({
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
    await registerService.execute({
      name: 'Henrique',
      email: 'henriquetomazparticularr@gmail.com',
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'Henrique',
        email: 'henriquetomazparticularr@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  test('it should be possible to register', async () => {
    const { user } = await registerService.execute({
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      password: '123456',
    })

    expect(user.id).toStrictEqual(expect.any(String))
  })
})
