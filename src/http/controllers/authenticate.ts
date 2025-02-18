import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
import { AuthenticateService } from '@/services/Authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
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
    const prismaRepository = new PrismaUserRepository()
    const authenticateService = new AuthenticateService(prismaRepository)
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
