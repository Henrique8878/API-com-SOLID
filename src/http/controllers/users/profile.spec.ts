import { test, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
describe('Teste e2e de profile', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  test('it should be a possible get profile', async () => {
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
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Henrique',
        email: 'henrique@eu.com',
      }),
    )
  })
})
