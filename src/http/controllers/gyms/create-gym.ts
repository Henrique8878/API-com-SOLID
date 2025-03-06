import * as z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { MakeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function CreateGym(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createGymSchema = z.object({
      title: z.string().min(3),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { title, description, phone, latitude, longitude } =
      createGymSchema.parse(request.body)
    const createGym = MakeCreateGymService()
    await createGym.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    reply.status(201).send('create gym')
  } catch (e) {
    reply.status(400).send(e)
  }
}
