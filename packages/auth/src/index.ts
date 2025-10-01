import { AbilityBuilder, createMongoAbility,  } from '@casl/ability';
import type {  CreateAbility, MongoAbility } from '@casl/ability';
import  type {User} from './models/user'
import { permissions } from './permissions';
import {  userSubject,  } from './subjects/user';
import { projectSubject,} from './subjects/project';
import { organizationSubject } from './subjects/organization';
import { inviteSubject } from './subjects/invite';
import z from 'zod';
import { billingSubject } from './subjects/billing';


const appAbilitiesSchema = z.union([
  userSubject,
  projectSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')])
]);

export type AppAbilities = z.infer<typeof appAbilitiesSchema>;


export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;


export function defineAbilityFor(user: User) {
    const  builder = new AbilityBuilder<AppAbility>(createAppAbility);

    if(typeof permissions[user.role] !== 'function'){
        throw new Error(`Role ${user.role} does not exist`)
    }

    permissions[user.role](user, builder);

    const ability = builder.build();

    return ability;
};
