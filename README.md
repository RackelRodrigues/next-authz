# Next.js SaaS + RBAC

Este projeto contém todo o boilerplate necessário para configurar um **SaaS multi-tenant** com **Next.js**, incluindo **autenticação** e **autorização RBAC**.

---

## ✨ Features

### 🔐 Authentication

- [ ] Autenticar usando **e-mail & senha**
- [ ] Autenticar usando **Github account**
- [ ] Recuperar senha via **e-mail**
- [ ] Criar conta (**e-mail, nome e senha**)

### 🏢 Organizations

- [ ] Criar nova organização
- [ ] Listar organizações às quais o usuário pertence
- [ ] Atualizar organização
- [ ] Encerrar organização
- [ ] Transferir propriedade da organização

### ✉️ Invites

- [ ] Convidar novo membro (**e-mail, role**)
- [ ] Aceitar convite
- [ ] Revogar convite pendente

### 👥 Members

- [ ] Listar membros da organização
- [ ] Atualizar papel de um membro
- [ ] Deletar membro

### 📂 Projects

- [ ] Listar projetos dentro de uma organização
- [ ] Criar novo projeto (**nome, url, descrição**)
- [ ] Atualizar projeto
- [ ] Deletar projeto

### 💳 Billing

- [ ] Obter detalhes de billing da organização
- [ ] Custos: **$20 por projeto / $10 por membro (exceto billing role)**

### 🔑 RBAC (Roles & Permissions)

- [ ] **Owner** (conta como administrador)
- [ ] **Administrator**
- [ ] **Member**
- [ ] **Billing** (um por organização)
- [ ] **Anonymous**

---

## 📊 Permissions Table

| Permissão              | Administrator | Member | Billing | Anonymous |
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

✅ = permitido  
❌ = não permitido  
⚠️ = permitido com condições

---

## ⚖️ Conditions

- Apenas **owners** podem transferir propriedade da organização;
- Apenas **administradores** e **autores do projeto** podem atualizar/deletar um projeto;
- **Membros** podem sair da própria organização.

---

## 🔌 API & RBAC

- Integração com **OAuth Github**
- Aplicação registrada no **Github**
- Fluxo de **autorização via Github**

---

## 🚀 Deployment

### 🌊 Digital Ocean (Kubernetes)

Baixe o arquivo de configuração do cluster e defina a variável de ambiente:

```bash
export KUBECONFIG=$HOME/.kube/k8s-config.yaml
```
