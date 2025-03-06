import { CheckinNotAllowedOnTheSameDay } from '@/services/errors/checkin-not-allowed-on-the-same-day'
import { MakeCheckinService } from '@/services/factories/make-checkin-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const gymIdGetParamsSchema = z.object({
      gymId: z.string().uuid(),
    })

    const latitutdeAndLongitudeBodySchema = z.object({
      userLatitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      userLongitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { gymId } = gymIdGetParamsSchema.parse(request.params)
    const { userLatitude, userLongitude } =
      latitutdeAndLongitudeBodySchema.parse(request.body)

    const createCheck_in = MakeCheckinService()
    await createCheck_in.execute({
      userId: request.user.sub,
      gymId,
      userLatitude,
      userLongitude,
    })

    reply.status(201).send()
  } catch (e) {
    if (e instanceof CheckinNotAllowedOnTheSameDay) {
      reply.status(400).send(e)
    }
    reply.status(400).send(e)
  }
}
