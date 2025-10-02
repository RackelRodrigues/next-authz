import { FastifyCorsOptions } from "@fastify/cors"
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function CreaateAccount(app: FastifyInstance){
 app.withTypeProvider<ZodTypeProvider>().post('/users', {
    schema: {
        body:z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)})
    }
 },()=>{
    return {message: 'Create Account'}
 })
}