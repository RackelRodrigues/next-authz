import { prisma } from '@/http/lib/prisma'
import { compare } from 'bcryptjs'
import Fastify, { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { hash } from 'crypto'

export async function requestPasswordRecover(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/password/recover', {
      schema: {
        tags: ['auth'],
        summary: 'Request password recovery',
        body: z.object({
         code: z.string(),
         password: z.string().min(6)
        }),
        response: {
          204: z.null(),
        },
      },

      handler: async (request, reply) => {
        const { code, password } = request.body

        const tokenFromCode = await prisma.user.findUnique({
          where: { id: code },
        })

        if (!tokenFromCode) {
          throw new UnauthorizedError
        }

      const passwordHash = await hash(password,6)

      await prisma.user.update({
        where:{
            id: tokenFromCode.userId
        },
        data:{
            passwordHash,
        }
      })
      },
    })
}
