import {z} from 'zod'

export const organizationSubject = z.tuple([
    z.union([ z.literal('manage'), z.literal('create'), z.literal('delete'),z.literal('update'), z.literal('transfer_ownership')]),
    z.literal('Origanization'),
])
export type OriganizationSubject = z.infer<typeof organizationSubject>