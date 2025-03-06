import request from 'supertest'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('test e2e validate checkin', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  test('it should be possbile validate checkin', async () => {
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

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'Movimento',
        latitude: 40,
        longitude: 170,
      },
    })

    const checkin = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/checkin/${checkin.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(204)
  })
})
