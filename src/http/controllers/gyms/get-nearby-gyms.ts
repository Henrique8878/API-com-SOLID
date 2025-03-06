import * as z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeGetListNearbyGyms } from '@/services/factories/make-get-nearby-gyms'

export async function GetNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getNearbyGyms = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = getNearbyGyms.parse(request.query)
  const getListGyms = MakeGetListNearbyGyms()
  const response = await getListGyms.execute({
    latitude: userLatitude,
    longitude: userLongitude,
  })
  reply.status(201).send(response)
}
