import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { CreateGym } from './create-gym'
import { GetListGyms } from './get-list-gyms'
import { GetNearbyGyms } from './get-nearby-gyms'

export async function GymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)
  app.post('/gym', CreateGym)
  app.get('/gyms', GetListGyms)
  app.get('/gyms/nearby', GetNearbyGyms)
}
