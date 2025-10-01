import {z} from 'zod'

export const projectSubject = z.tuple([
    z.union([ z.literal('manage'), z.literal('get'),z.literal('create'), z.literal('delete'),z.literal('update'), z.literal('invite')]),
    z.literal('Project'),
])
export type ProjectSubject = z.infer<typeof projectSubject>