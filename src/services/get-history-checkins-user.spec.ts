import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from './in-memory/in-memory-checkin-repository'
import { GetHistoryCheckinsUserService } from './get-history-checkins-user'

let inMemoryRepository: InMemoryCheckInRepository
let getHistoryCheckInService: GetHistoryCheckinsUserService

beforeEach(() => {
  inMemoryRepository = new InMemoryCheckInRepository()
  getHistoryCheckInService = new GetHistoryCheckinsUserService(
    inMemoryRepository,
  )
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

    const listOfCheckins = await getHistoryCheckInService.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(listOfCheckins).toHaveLength(2)
    expect(listOfCheckins).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  test('it should be possible get history from checkins', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const listOfCheckins = await getHistoryCheckInService.execute({
      userId: 'user-01',
      page: 2,
    })

    console.log(listOfCheckins)

    expect(listOfCheckins).toHaveLength(2)
    expect(listOfCheckins).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
