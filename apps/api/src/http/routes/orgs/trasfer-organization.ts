import { prisma } from "@/http/lib/prisma";
import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { userSchema, organizationSchema, defineAbilityFor } from "@saas/auth";
import { BadRequestError } from "../_errors/bad-request-error";
import { createSlug } from "@/utils/create-organization";
import { Role } from "@prisma/client";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { getUserPermissions } from "@/utils/get-user-permissions";

export async function transferOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post('/organization/:slug', {
      schema: {
        tags: ['organization'],
        summary: 'Update organization details',
        security: [{bearerAuth: []}],
        body: z.object({
            transferToUserId: z.string()
         }),
        params:{
         slug: z.string()
        },
        response:{
            204: z.null()
        }
      },
    }, async (request, reply) => {

      const { slug } = request.params
      const {membership, organization} = await request.getUserMembership(slug)
      const userId = await request.getCurrentUserId()
      const authOrganization = organizationSchema.parse(organization)
      const {cannot} = getUserPermissions(userId, membership.role)

      if(cannot('update', authOrganization)){
      throw new UnauthorizedError("You'are not allowed to shutdown this organization")
     
      }

      const {transferToUserId} = request.body  

   const transferToMembership = await prisma.member.findUnique({
    where: {
    organizationId_userId: {
      organizationId: organization.id,
      userId: transferToUserId,
    },
  },
})

if (!transferToMembership) {
  throw new BadRequestError(
    'Target user is not a member of this organization.',
  )
}


await prisma.$transaction([
  prisma.member.update({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: transferToUserId,
      },
    },
    data: {
      role: 'ADMIN',
    },
  }),
  prisma.organization.update({
    where: { id: organization.id },
    data: { ownerId: transferToUserId },
  }),
])

return reply.status(204).send()


    })
} 