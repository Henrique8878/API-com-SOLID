import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymRepository } from './in-memory/in-memory-gym-repository'
import { NearbyGymsService } from './get-nearby-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let nearbyGymsService: NearbyGymsService

describe('tests from get-list-gyms', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    nearbyGymsService = new NearbyGymsService(inMemoryGymRepository)
  })

  test('it should be possible to get a list of nearby gyms', async () => {
    await inMemoryGymRepository.create({
      id: 'gym-02',
      title: 'gym - js',
      description: '',
      phone: '',
      latitude: -21.252008,
      longitude: -44.979055,
    })

    await inMemoryGymRepository.create({
      id: 'gym-03',
      title: 'gym - ts',
      description: '',
      phone: '',
      latitude: -21.252008,
      longitude: -44.979055,
    })

    const nearbyGyms = await nearbyGymsService.execute({
      userLatitude: -21.252008,
      userLongitude: -44.979055,
    })
    expect(nearbyGyms?.nearbyGyms).toEqual([
      expect.objectContaining({ id: 'gym-02' }),
      expect.objectContaining({ id: 'gym-03' }),
    ])
  })

  test('it should be possible to reject a not nearby gyms', async () => {
    await inMemoryGymRepository.create({
      id: 'gym-02',
      title: 'gym - js',
      description: '',
      phone: '',
      latitude: -21.252008,
      longitude: -44.979055,
    })

    await inMemoryGymRepository.create({
      id: 'gym-03',
      title: 'gym - ts',
      description: '',
      phone: '',
      latitude: -21.252008,
      longitude: -44.979055,
    })

    const nearbyGyms = await nearbyGymsService.execute({
      userLatitude: -21.17040372589419,
      userLongitude: -44.92696045885275,
    })
    expect(nearbyGyms?.nearbyGyms).toEqual([])
  })
})
