import request from 'supertest'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('test e2e get list nearby gyms', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  test('it should be possbile get list nearby gyms', async () => {
    await request(app.server).post('/users').send({
      name: 'Henrique',
      email: 'henrique@eu.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'henrique@eu.com',
      password: '123456',
    })
    const { token } = authResponse.body

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Black Fit',
        description: 'eeerf',
        phone: '99887637',
        latitude: 40,
        longitude: 170,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Golden Fitness',
        description: 'eeerf',
        phone: '99887637',
        latitude: 40,
        longitude: 170,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLatitude: 40,
        userLongitude: 170,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.nearbyGyms).toHaveLength(2)
    expect(response.body.nearbyGyms).toEqual([
      expect.objectContaining({
        title: 'Black Fit',
      }),
      expect.objectContaining({
        title: 'Golden Fitness',
      }),
    ])
  })
})
