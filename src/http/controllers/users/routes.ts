import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { VerifyJwt } from '../../middlewares/verify-jwt'

// camada que separa a parte das funções da parte de realmente realizar as requisiço~es. Estas serão as minhas rotas

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Só vão ser chamadas com ususário autenticado
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
