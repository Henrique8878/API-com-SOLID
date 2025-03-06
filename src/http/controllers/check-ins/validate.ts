import { MakeValidateCheckin } from '@/services/factories/make-validate-checkin'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkinParamsSchema = z.object({
    checkinId: z.string().uuid(),
  })

  const { checkinId } = checkinParamsSchema.parse(request.params)

  const validateCheckin = MakeValidateCheckin()
  await validateCheckin.execute({
    checkinId,
  })

  reply.status(204).send()
}
