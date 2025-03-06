import request from 'supertest'
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('test e2e create gym', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  test('it should be possbile create a gym', async () => {
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

    const response = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Black Fit',
        description: '',
        phone: '',
        latitude: 40,
        longitude: 170,
      })

    expect(response.status).toEqual(201)
  })
})
