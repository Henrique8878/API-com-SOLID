import { FastifyReply, FastifyRequest } from 'fastify'

export async function VerifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new Error('JWT Unauthorized')
    }
    await request.jwtVerify()
  } catch (e) {
    reply.status(401).send(e)
  }
}
