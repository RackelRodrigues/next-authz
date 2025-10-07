import { prisma } from "@/http/lib/prisma";
import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createSlug } from "@/utils/create-organization";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { projectSchema } from "@saas/auth";

export async function updateProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put('/organization/:slug/projects/:projectId', {
      schema: {
        tags: ['projects'],
        summary: 'update a  project',
        body: z.object({
          name: z.string(),
          description: z.string(),
        }),
        params:{
            slug: z.string(),
            projectId: z.string().uuid(),
        },
        response:{
            204: z.null()
        }
      },
    }, async (request, reply) => {
    const { slug, projectId } = request.params
const userId = await request.getCurrentUserId()
const { organization, membership } = await request.getUserMembership(slug)

const { cannot } = getUserPermissions(userId, membership.role)

const project = await prisma.project.findUnique({
  where: {
    id: projectId,
    organizationId: organization.id

  }
})

const authProject = projectSchema.parse(project)


if (cannot('update', authProject)) {
  throw new UnauthorizedError(
    "You're not allowed to update this projects.",
  )
}


const {name, description} = request.body

   await prisma.project.delete({
          where: {
            id: projectId,
          },
          data:{
            name,
            description,
          }
        })


 reply.status(204).send()
} )}