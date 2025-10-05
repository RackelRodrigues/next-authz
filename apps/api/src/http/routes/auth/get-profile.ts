import { prisma } from '@/http/lib/prisma';
import { compare } from 'bcryptjs';
import Fastify, { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from "zod";
import { BadRequestError } from '../_errors/bad-request-error';
import { auth } from '@/http/middlewares/auth';

export async function getProfile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).get('/profile', {
        schema: {
            tags: ['auth'],
            summary: "Get Authenticated user profile",
            security:[
              { bearerAuth: []},
            ],
            response: {
              200: z.object({
          user: z.object({
            id: z.string().uuid(),
            name: z.string().nullable(),
            email: z.string().email(),
            avatarUrl: z.string().url().nullable(),
          })
            })
             }
        },

        handler: async (request, reply) => {
        //verify whats is generic in typescript
        const userId= await request.getCurrentUserId()

       const user= await prisma.user.findUmique({
        select:{
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
        },
        where: {
            id: userId,
        },
       })

       if(!user){
         throw new BadRequestError('user not found ')
                    
       }

       return reply.send({
        user
       })

}
    })
}
