import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export function checkinRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)
  app.post('/gym/:gymId/checkin', create)
  app.get('/checkin/history', history)
  app.get('/checkin/metrics', metrics)
  app.patch('/checkin/:checkinId/validate', validate)
}
