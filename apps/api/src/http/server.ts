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
import { transferOrganization } from './routes/orgs/trasfer-organization';
import { createProject } from './routes/projects/create-projects';
import { deleteProject } from './routes/projects/delete-Project';
import { getProject } from './routes/projects/get-project';
import { getProjects } from './routes/projects/get-projects';
import { updateProject } from './routes/projects/update-project';
import { getMembers } from './routes/members/get-member';
import { UpdateMembers } from './routes/members/update.member';
import { removeMembers } from './routes/members/remove-member';
import { createInvite } from './routes/invites/create-invite';
import { getInvite } from './routes/invites/get-invite';
import { getInvites } from './routes/invites/get-invites';
import { acceptInvite } from './routes/invites/accept-invite';
import { rejectInvite } from './routes/invites/reject-invite';

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
app.register(transferOrganization)


app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)


app.register(getMembers)
app.register(UpdateMembers)
app.register(removeMembers)


app.register(createInvite)
app.register(getInvite)
app.register(getInvites)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revolkeInvite)








app.listen({port: 3333}).then(() => {
console.log('HTTP Server running' )
})