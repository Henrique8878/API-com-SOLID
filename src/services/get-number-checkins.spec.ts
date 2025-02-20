import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from './in-memory/in-memory-checkin-repository'
import { GetNumberCheckinsService } from './get-number-checkins'

let inMemoryRepository: InMemoryCheckInRepository
let getNumberCheckinsService: GetNumberCheckinsService

beforeEach(() => {
  inMemoryRepository = new InMemoryCheckInRepository()
  getNumberCheckinsService = new GetNumberCheckinsService(inMemoryRepository)
})

describe('tests from get history checkins', () => {
  test('it should be possible get history from checkins', async () => {
    await inMemoryRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await inMemoryRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const numberOfCheckins = await getNumberCheckinsService.execute({
      userId: 'user-01',
    })

    expect(numberOfCheckins).toEqual(2)
  })
})
