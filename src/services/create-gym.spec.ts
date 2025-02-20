import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryGymRepository } from './in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { CreateGymService } from './create-gym'

let inMemoryGymRepository: InMemoryGymRepository
let createGymService: CreateGymService

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('tests from get-user-profile service', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    createGymService = new CreateGymService(inMemoryGymRepository)

    inMemoryGymRepository.gyms.push({
      id: 'gym-01',
      description: '',
      phone: '',
      title: 'gym js',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })

  test('it should be possible to create a gym', async () => {
    const gym = await createGymService.execute({
      id: 'gym-02',
      title: 'gym - js',
      description: '',
      phone: '',
      latitude: -21.252008,
      longitude: -44.979055,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
