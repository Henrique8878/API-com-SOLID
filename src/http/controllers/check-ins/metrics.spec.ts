import request from 'supertest'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('test e2e create check_in', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  test('it should be possbile create a check_in', async () => {
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
        id: 'a20cd7c7-0f77-4c48-813e-c9ca1bdcab02',
        title: 'Golden Fitness',
        description: 'eeerf',
        phone: '99887637',
        latitude: 40,
        longitude: 170,
      })

    const gym = await prisma.gym.create({
      data: {
        title: 'Movimento',
        latitude: 40,
        longitude: 170,
      },
    })

    await request(app.server)
      .post(`/gym/${gym.id}/checkin`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: 40,
        userLongitude: 170,
      })

    const response = await request(app.server)
      .get('/checkin/metrics')
      .set('Authorization', `Bearer ${token}`)

    console.log(response.body)
    expect(response.body).toEqual(
      expect.objectContaining({
        checkinCount: 1,
      }),
    )
  })
})
