import * as z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeGetListGyms } from '@/services/factories/make-get-list-gyms'
import { NotBeGymsWithThisName } from '@/services/errors/not-be-gyms-with-this-title'

export async function GetListGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getGymSchema = z.object({
      title: z.string(),
      page: z.coerce.number().min(1).default(1),
    })

    const { title, page } = getGymSchema.parse(request.query)
    const getListGyms = MakeGetListGyms()
    const response = await getListGyms.execute({
      title,
      page,
    })
    reply.status(200).send(response)
  } catch (e) {
    if (e instanceof NotBeGymsWithThisName) {
      reply.status(402).send(e)
    }
  }
}
