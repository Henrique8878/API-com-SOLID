import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryRepository: InMemoryUsersRepository
let authenticateService: AuthenticateService

describe('tests from authenticate', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    authenticateService = new AuthenticateService(inMemoryRepository)
  })
  test('it should be possible authenticate a user', async () => {
    await inMemoryRepository.create({
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { hasUser } = await authenticateService.execute({
      email: 'henriquetomazparticular@gmail.com',
      password: '123456',
    })

    expect(hasUser.id).toEqual(expect.any(String))
  })

  test('it should be possible to generate an error if there is no matching email ', async () => {
    await inMemoryRepository.create({
      name: 'Henrique',
      email: 'henriquetomazmw3@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      async () =>
        await authenticateService.execute({
          email: 'henriquetomazparticular@gmail.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('it should be possible to generate an error if there is no matching password ', async () => {
    await inMemoryRepository.create({
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      async () =>
        await authenticateService.execute({
          email: 'henriquetomazparticular@gmail.com',
          password: '122456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
