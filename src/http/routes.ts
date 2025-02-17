import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

// camada que separa a parte das funções da parte de realmente realizar as requisiço~es. Estas serão as minhas rotas

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
