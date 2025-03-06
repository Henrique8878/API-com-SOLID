import { test, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
describe('Teste e2e de Register', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  test('it should be a possible register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Henrique',
      email: 'henrique@eu.com',
      password: '123456',
    })

    expect(response.status).toEqual(201)
  })
})
