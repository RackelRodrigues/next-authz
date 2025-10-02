import {z} from 'zod'

export const billingSubject = z.tuple([
    z.union([ z.literal('manage'), z.literal('get'), z.literal('export')]),
    z.literal('Origanization'),
])
export type BillingSubject = z.infer<typeof billingSubject>