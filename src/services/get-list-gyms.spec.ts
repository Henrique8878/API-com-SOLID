import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymRepository } from './in-memory/in-memory-gym-repository'
import { GetListGymsService } from './get-list-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let getListGymsService: GetListGymsService

describe('tests from get-list-gyms', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    getListGymsService = new GetListGymsService(inMemoryGymRepository)
  })

  test('it should be possible to get a list of gyms', async () => {
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
    const listOfGyms = await getListGymsService.execute({
      title: 'gym',
      page: 1,
    })

    expect(listOfGyms).toHaveLength(2)
    expect(listOfGyms).toEqual([
      expect.objectContaining({ id: 'gym-02' }),
      expect.objectContaining({ id: 'gym-03' }),
    ])
  })

  test('it should be possible to get a list paginated of gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymRepository.create({
        id: `gym-02`,
        title: `gym-${i}`,
        description: '',
        phone: '',
        latitude: -21.252008,
        longitude: -44.979055,
      })
    }

    const listOfGyms = await getListGymsService.execute({
      title: 'gym',
      page: 2,
    })

    expect(listOfGyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ])
  })
})
