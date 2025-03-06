// JWT : Json-web-tokens

// Usuário faz login, o Back-end cria um token Único, não modificável e STATELESS
// STATELESS : Não pode ser modificado o estado
// Back-End: Quando vai criar o token, ele usa uma palavra-chave () string
// palavra-chave: O meu Back-end armazenará uma palavra chave única, onde o JWT será gerado a partir dela
// palavra-chave: DFGWEHWRTHRTRDGFTHRTHIRJKODFGNBKLWRTJGHIOPRTI
// Email/senha -> header.payload.sign
// Login -> JWT
// JWT -> Todas as requisições dalipra frente
// Header (cabeçalho): Authorization

// import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
// import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { MakeGetUserProfile } from '@/services/factories/make-get-user-profile'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userProfile = MakeGetUserProfile()
    const { user } = await userProfile.execute({
      id: request.user.sub,
    })
    reply.status(200).send(user)
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
