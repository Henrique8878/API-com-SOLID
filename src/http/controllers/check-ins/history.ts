import { MakeHistoryCheckins } from '@/services/factories/make-get-history-checkins'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  try {
    const pageParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = pageParamsSchema.parse(request.query)
    const getHistoryCheckin = MakeHistoryCheckins()
    const checkin = await getHistoryCheckin.execute({
      userId: request.user.sub,
      page,
    })

    reply.status(200).send(checkin)
  } catch (e) {
    reply.status(400).send(e)
  }
}
