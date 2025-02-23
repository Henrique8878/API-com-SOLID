import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from './in-memory/in-memory-checkin-repository'
import { CheckInService } from './checkin'
import { InMemoryGymRepository } from './in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let inMemoryRepository: InMemoryCheckInRepository
let inMemoryGymRepository: InMemoryGymRepository
let checkInService: CheckInService

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('tests from get-user-profile service', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryCheckInRepository()
    inMemoryGymRepository = new InMemoryGymRepository()
    checkInService = new CheckInService(
      inMemoryRepository,
      inMemoryGymRepository,
    )

    inMemoryGymRepository.gyms.push({
      id: 'gym-01',
      description: '',
      phone: '',
      title: 'gym js',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })

  test('it should be possible get a user profile', async () => {
    const { checkIn } = await checkInService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('it should not be to create a two check-ins on same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))
    const { checkIn } = await checkInService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    console.log(checkIn.created_at)

    await expect(
      async () =>
        await checkInService.execute({
          userId: 'user-01',
          gymId: 'gym-01',
          userLatitude: 0,
          userLongitude: 0,
        }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('it should not be to create a two check-ins on same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))
    await checkInService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 23, 8, 0, 0))

    const { checkIn } = await checkInService.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('It should be possible to generate an error when trying to check in at a gym that is more than 100m away', async () => {
    inMemoryGymRepository.gyms.push({
      id: 'gym-02',
      description: '',
      phone: '',
      title: 'gym js',
      latitude: new Decimal(-21.252036),
      longitude: new Decimal(-44.979034),
    })

    await expect(
      async () =>
        await checkInService.execute({
          userId: 'user-01',
          gymId: 'gym-02',
          userLatitude: -21.232997,
          userLongitude: -44.989087,
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
