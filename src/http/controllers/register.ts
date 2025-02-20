// camada controllers onde eu lido com as requisições Http e somente com elas, requests e replys, sem misturar com as regras de negócio. Aqui eu posso validar o que vem da requisição http, do body, com zod, mas somente isto, toda a parte que é comum, por exemplo: Eu criar um objeto, ir até o banco de dados e enviar este objeto para o banco de dados, isto eu crio uma camada service para separar estes códigos.

// Este é o arquivo que abrigará a função de register, mas terão outras requisições pela frente, e todas irão para o routes.ts.

// factory pattern, fábrica de riação de coisas comuns, sempre quando tivermos um código que utilizaremos em várias partes da aplicaçãoo e ele recebe várias dependências, tuilizo o factory pattern.

import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
import { UserAlreadyExists } from '@/services/errors/user-already-exists'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()
    await registerService.execute({ name, email, password })
  } catch (e) {
    if (e instanceof UserAlreadyExists) {
      reply.status(409).send({
        message: e.message,
      })
    }

    throw e
  }

  reply.status(201).send()
}
