import { MakeGetNumberCheckins } from '@/services/factories/make-get-number-checkins'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getNumberCheck_in = MakeGetNumberCheckins()
  const checkinCount = await getNumberCheck_in.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    checkinCount,
  })
}
