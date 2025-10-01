import type { AbilityBuilder } from "@casl/ability"
import type { AppAbility } from "."
import type { User } from "./models/user"
import type { Role } from "./roles"



type PermissionsByRole =(user: User, builder: AbilityBuilder<AppAbility>) => void
export const permissions: Record<Role, PermissionsByRole> = {
//  ROLES ISSO (){} E A MESMA COISA QUE ()=>{}


  ADMIN (_, {can}) {
    can("manage", "all")
  },
  MEMBER(_, {can}) {
    can("manage", "Project")
  },
  BILLING(_, {can}) {
  }

}