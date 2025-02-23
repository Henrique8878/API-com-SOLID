import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from './in-memory/in-memory-checkin-repository'
import { ValidateCheckinService } from './validate-checkin'
import { ResourceNotFount } from './errors/resource-not-found'
import { ItIsNotPossibleValidatedCheckinAfterTwentyMinutes } from './errors/not-possible-validated-checkin-after-twenty-minutes'

let inMemoryRepository: InMemoryCheckInRepository
let validateCheckinService: ValidateCheckinService

beforeEach(() => {
  vi.useFakeTimers()
  inMemoryRepository = new InMemoryCheckInRepository()
  validateCheckinService = new ValidateCheckinService(inMemoryRepository)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('tests from get-user-profile service', () => {
  test('it should be possible to validate a check-in', async () => {
    await inMemoryRepository.create({
      id: 'check-in-01',
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await inMemoryRepository.create({
      id: 'check-in-02',
      gym_id: 'gym-02',
      user_id: 'user-02',
    })

    const validateCheckin = await validateCheckinService.execute({
      checkinId: 'check-in-01',
    })

    await expect(validateCheckin.validated_at).not.toEqual(null)
  })

  test('it should not be possible to validate a inexistent check-in', async () => {
    await inMemoryRepository.create({
      id: 'check-in-01',
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await inMemoryRepository.create({
      id: 'check-in-02',
      gym_id: 'gym-02',
      user_id: 'user-02',
    })

    await expect(
      async () =>
        await validateCheckinService.execute({
          checkinId: 'check-in-03',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFount)
  })

  test('it should not be possible to validate a checkin after twenty minutes', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40))
    await inMemoryRepository.create({
      id: 'check-in-01',
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21)

    expect(
      async () =>
        await validateCheckinService.execute({ checkinId: 'check-in-01' }),
    ).rejects.toBeInstanceOf(ItIsNotPossibleValidatedCheckinAfterTwentyMinutes)
  })
})
