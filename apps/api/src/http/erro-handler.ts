import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { BadRequestError } from "./routes/_errors/bad-request-error"
import { UnauthorizedError } from "./routes/_errors/unauthorized-error"
import { ZodError } from "zod";


type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler = ( 
  error: FastifyError | ZodError | BadRequestError | UnauthorizedError,
  request: FastifyRequest,
  reply: FastifyReply
)=>{
  if(error instanceof ZodError){
    return reply.status(400).send({
        message: 'validation error',
        errors: error.flatten().fieldErrors,
    })
  }
  if(error instanceof BadRequestError){
    return reply.status(400).send({
        message: error.message,
    })
  } 
  if(error instanceof UnauthorizedError){
    return reply.status(401).send({
        message: error.message,
    })
  } 

  console.error(error)
  
  //send error to some observability platform
  return reply.status(500).send({
    message: 'Internal server error.'
  })


}