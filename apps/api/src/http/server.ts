import{ fastify} from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-UI';
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,  
    ZodTypeProvider
} from 'fastify-type-provider-zod'
import { CreaateAccount } from './routes/auth/create-account';
import { authenticateWithPassword } from './routes/auth/authenticate-with-password';
import { getProfile } from './routes/auth/get-profile';
import { errorHandler } from './erro-handler';
import { requestPasswordRecover } from './routes/auth/resquest-passwordrecover';
import { resetPassword } from './routes/auth/reset-password';
import { authenticateWithGithub } from './routes/auth/authenticate-with-GitHub';
import { createOrganization } from './routes/orgs/create-organization';
import { getOrganization } from './routes/orgs/get-organization';
import { getOrganizations } from './routes/orgs/get-organizations';
import { getMembership } from './routes/orgs/get-membership';
import { updateOrganization } from './routes/orgs/update-organization';
import { shutdownOrganization } from './routes/orgs/shutdown-organization';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Nextjs SaaS',
      description: 'Full-stack SaaS app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    components:{
      securitySchemes:{
        bearerAuth:{
          type: 'http',
          scheme:'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [],
  },
  transform: jsonSchemaTransform,

});

app.register(fastifySwaggerUI,{
    routePrefix: '/docs'
})

app.register(fastifyCors);

app.register(fastifyJwt, {
  secret: 'my-jwt-secret',
})

app.register(CreaateAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(authenticateWithGithub)
app.register(createOrganization)
app.register(getOrganization)
app.register(getOrganizations)
app.register(getMembership)
app.register(updateOrganization)
app.register(shutdownOrganization)


app.listen({port: 3333}).then(() => {
console.log('HTTP Server running' )
})