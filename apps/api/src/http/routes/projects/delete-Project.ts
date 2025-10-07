import { prisma } from "@/http/lib/prisma";
import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createSlug } from "@/utils/create-organization";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { projectSchema } from "@saas/auth";

export async function deleteProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete('/organization/:slug/projects/:projectId', {
      schema: {
        tags: ['projects'],
        summary: 'delete a  project',
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


if (cannot('delete', authProject)) {
  throw new UnauthorizedError(
    "You're not allowed to delete this projects.",
  )
}

   await prisma.project.delete({
          where: {
            id: projectId,
          },
        })


 reply.status(204).send()
} )}