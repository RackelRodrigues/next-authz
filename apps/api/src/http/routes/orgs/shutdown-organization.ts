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

export async function shutdownOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post('/organization/:slug', {
      schema: {
        tags: ['organization'],
        summary: 'Shutdown organization',
        security: [{bearerAuth: []}],
        body: z.object({
          name: z.string(),
          domain: z.string(),
          shouldAttachUsersByDomain: z.boolean().optional(),
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
      const{name, domain, shouldAttachUsersByDomain} = request.body

      const authUser= userSchema.parse({
        id: userId,
        role: membership.role,
      })


      const authOrganization= organizationSchema.parse(organization)


      const {cannot} = getUserPermissions(userId, membership.role)

      if(cannot('update', authOrganization)){
      throw new UnauthorizedError("You'are not allowed to update this organization")
     
      }

      if(domain){
        const organizationByDomain = await prisma.organization.findFirst({
            where:{domain, slug:{
              not: slug
            }}
        }) 
        
        if(organizationByDomain){
            throw new BadRequestError('Another organization with same domain already exists')
        }
      }

    await prisma.organization.update({
      where:{
        id: organization.id
      },
       data: {
         name,
         domain,
         shouldAttachUsersByDomain,
       
  },
})

    })
} 