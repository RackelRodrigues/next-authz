import type { AbilityBuilder } from "@casl/ability"
import type { AppAbility } from "."
import type { User } from "./models/user"
import type { Role } from "./roles"



type PermissionsByRole = (
  user: User, 
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
//  ROLES ISSO (){} E A MESMA COISA QUE ()=>{}

  ADMIN (user, {can, cannot}) {
    can('manage', 'all') // admin can do everything
    cannot(['transfer_ownership', 'update'], 'Organization' ) // cannot transfer if not owner
    can(['transfer_ownership', 'update'], 'Organization', { ownerId: {$eq: user.id} }) // can transfer if owner
   
  },
  MEMBER(user, {can}) {
    can('get', 'User')
    can(['create','get'], 'Project')
    can(['update','delete'] , 'Project', { ownerId: {$eq: user.id} })
    
  },
  BILLING(_, {can}) {
    // can('manage', '')
  }

}