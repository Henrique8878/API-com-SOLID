import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodyAuthenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodyAuthenticateSchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({
      email,
      password,
    })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }

  reply.status(200).send()
}
