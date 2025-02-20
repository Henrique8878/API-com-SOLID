import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFount } from './errors/resource-not-found'

let inMemoryRepository: InMemoryUsersRepository
let getUserProfileService: GetUserProfileService

describe('tests from get-user-profile service', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    getUserProfileService = new GetUserProfileService(inMemoryRepository)
  })

  test('it should be possible get a user profile', async () => {
    const { id } = await inMemoryRepository.create({
      name: 'henrique',
      email: 'henriquetomazparticular@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUserProfileService.execute({ id })

    expect(id).toEqual(user.id)
  })

  test('it should be possible to generate a error Resource not found when user not exists', async () => {
    await inMemoryRepository.create({
      name: 'henrique',
      email: 'henriquetomazparticular@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      async () => await getUserProfileService.execute({ id: 'efrrf' }),
    ).rejects.toBeInstanceOf(ResourceNotFount)
  })
})
