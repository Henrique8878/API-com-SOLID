import fastify from 'fastify'
import { UsersRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env/.index'
import { GymRoutes } from './http/controllers/gyms/routes'
import { checkinRoutes } from './http/controllers/check-ins/routes'
export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_TOKEN,
})
app.register(UsersRoutes)
app.register(GymRoutes)
app.register(checkinRoutes)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: error.message,
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send(error)
})
