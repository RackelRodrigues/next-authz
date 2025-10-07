import { prisma } from "@/http/lib/prisma";
import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createSlug } from "@/utils/create-organization";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { projectSchema } from "@saas/auth";
import { BadRequestError } from "../_errors/bad-request-error";

export async function deleteProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete("/organization/:orgSlug/projects/:projectSlug", {
      schema: {
        tags: ["projects"],
        summary: "Delete a project",
        params: z.object({
          orgSlug: z.string(),
          projectSlug: z.string(),
        }),
        response: {
          200: z.object({
            project: z.object({
              id: z.string().uuid(),
              description: z.string(),
              name: z.string(),
              slug: z.string(),
              avatarUrl: z.string().nullable(),
              organizationId: z.string().uuid(),
              ownerId: z.string().uuid(),
              owner: z.object({
                id: z.string().uuid(),
                name: z.string().nullable(),
                avatarUrl: z.string().nullable(),
              }),
            }),
          }),
        },
      },
    }, async (request, reply) => {
      const { orgSlug, projectSlug } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getUserMembership(orgSlug);

      const { cannot } = getUserPermissions(userId, membership.role);

      if (cannot("get", "Project")) {
        throw new UnauthorizedError("You're not allowed to see this project.");
      }

      const project = await prisma.project.findUnique({
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          ownerId: true,
          avatarUrl: true,
          organizationId: true,
          owner: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
        where: {
          slug: projectSlug,
          organizationId: organization.id,
        },
      });

      if (!project) {
        throw new BadRequestError("Project not found.");
      }

      return reply.send({ project });
    });
}
