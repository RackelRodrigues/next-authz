# Next.js SaaS + RBAC

This project contains all the necessary boilerplate to set up a multi-tenant SaaS with Next.js including authentication and RBAC authorization.

---

## ✨ Features

### 🔐 Authentication

- [ ] It should be able to authenticate using email & password
- [ ] It should be able to authenticate using Github account
- [ ] It should be able to recover password using email
- [ ] It should be able to create an account (email, name, and password)

### 🏢 Organizations

- [ ] It should be able to create a new organization
- [ ] It should be able to list organizations to which the user belongs
- [ ] It should be able to update an organization
- [ ] It should be able to shut down an organization
- [ ] It should be able to transfer organization ownership

### ✉️ Invites

- [ ] It should be able to invite a new member (email, role)
- [ ] It should be able to accept an invite
- [ ] It should be able to revoke a pending invite

### 👥 Members

- [ ] It should be able to list organization members
- [ ] It should be able to update a member role
- [ ] It should be able to delete a member

### 📂 Projects

- [ ] It should be able to list projects within an organization
- [ ] It should be able to create a new project (name, url, description)
- [ ] It should be able to update a project
- [ ] It should be able to delete a project

### 💳 Billing

- [ ] It should be able to get billing details of the organization
- [ ] Costs: $20 per project / $10 per member (except billing role)

### 🔑 RBAC (Roles & Permissions)

- [ ] Owner (counts as administrator)
- [ ] Administrator
- [ ] Member
- [ ] Billing (one per organization)
- [ ] Anonymous

---

## 📊 Permissions Table

| Permission             | Administrator | Member | Billing | Anonymous |
| ---------------------- | ------------- | ------ | ------- | --------- |
| Update organization    | ✅            | ❌     | ❌      | ❌        |
| Delete organization    | ✅            | ❌     | ❌      | ❌        |
| Invite a member        | ✅            | ❌     | ❌      | ❌        |
| Revoke an invite       | ✅            | ❌     | ❌      | ❌        |
| List members           | ✅            | ✅     | ✅      | ❌        |
| Transfer ownership     | ⚠️            | ❌     | ❌      | ❌        |
| Update member role     | ✅            | ❌     | ❌      | ❌        |
| Delete member          | ✅            | ⚠️     | ❌      | ❌        |
| List projects          | ✅            | ✅     | ✅      | ❌        |
| Create a new project   | ✅            | ✅     | ❌      | ❌        |
| Update a project       | ✅            | ⚠️     | ❌      | ❌        |
| Delete a project       | ✅            | ⚠️     | ❌      | ❌        |
| Get billing details    | ✅            | ❌     | ✅      | ❌        |
| Export billing details | ✅            | ❌     | ✅      | ❌        |

✅ = allowed  
❌ = not allowed  
⚠️ = allowed with conditions

---

## ⚖️ Conditions

- Only owners can transfer organization ownership
- Only administrators and project creators can update/delete a project
- Members can leave their own organization

---

## 🔌 API & RBAC

- Integration with Github OAuth
- Application registered on Github
- Github authorization flow

---

## 🚀 Deployment

### 🌊 Digital Ocean (Kubernetes)

Download the cluster configuration file and set the environment variable:

```bash
export KUBECONFIG=$HOME/.kube/k8s-config.yaml
```
