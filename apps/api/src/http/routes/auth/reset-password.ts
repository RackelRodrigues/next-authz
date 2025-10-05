import { prisma } from '@/http/lib/prisma'
import  { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '@/http/middlewares/auth'

export async function resetPassword(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/password/reset', {
      schema: {
        tags: ['auth'],
        summary: 'Get Authenticated user profile',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },

      handler: async (request, reply) => {
        const { email } = request.body

        const userFromEmail = await prisma.user.findUnique({
          where: { email },
        })

        if (!userFromEmail) {
          return reply.status(201).send()
        }

        const { id: code } = await prisma.token.create({
          data: {
            type: 'PASSWORD_RECOVER',
            userId: userFromEmail.id,
          },
        })

        return reply.status(201).send()
      },
    })
}
