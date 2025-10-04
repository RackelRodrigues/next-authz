import { prisma } from "@/http/lib/prisma";
import { FastifyCorsOptions } from "@fastify/cors"
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import {hash} from 'bcryptjs'

export async function CreaateAccount(app: FastifyInstance){
 app.withTypeProvider<ZodTypeProvider>().post('/users', {
    schema: {
      summary: 'Create a new account',
        body:z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)})
    }
 },async (request, reply)=>{
    const {name, email, password} = request.body

    const userWithSameEmail = await prisma.user.findUnique({
      where: {email}
    })

    if(userWithSameEmail){
      return reply.status(400).send({message: 'E-mail already registered.'})
    }

    const passwordHash = await hash(password, 6)
    
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })


    return reply.status(201).send()
 })
}