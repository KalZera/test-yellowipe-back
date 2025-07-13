# 📖 Documentação da API - Yellowipe Backend

Esta documentação descreve todos os endpoints disponíveis na API do Yellowipe, incluindo parâmetros, exemplos de requisição e resposta.

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após o login, você receberá um token que deve ser incluído no cabeçalho `Authorization` das requisições protegidas.

```
Authorization: Bearer <seu-token-jwt>
```

## 📋 Base URL

```
http://localhost:3333
```

---

## 👤 Endpoints de Usuário

### 1. Registrar Usuário

Cria uma nova conta de usuário.

**Endpoint:** `POST /register`

**Autenticação:** Não requerida

**Parâmetros do Body:**
```json
{
  "name": "string (obrigatório)",
  "email": "string (obrigatório, formato email)",
  "password": "string (obrigatório, mínimo 6 caracteres)"
}
```

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3333/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456"
  }'
```

**Resposta de Sucesso:**
- **Status:** 201 Created
- **Body:** Vazio

**Possíveis Erros:**
- **400 Bad Request:** Dados inválidos
- **500 Internal Server Error:** Erro interno do servidor

---

### 2. Login (Autenticar)

Autentica um usuário e retorna tokens de acesso.

**Endpoint:** `POST /session`

**Autenticação:** Não requerida

**Parâmetros do Body:**
```json
{
  "email": "string (obrigatório, formato email)",
  "password": "string (obrigatório, mínimo 6 caracteres)"
}
```

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3333/session \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

**Resposta de Sucesso:**
- **Status:** 200 OK
- **Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```
- **Cookies:** Define um cookie `refreshToken` para renovação automática

**Possíveis Erros:**
- **400 Bad Request:** Credenciais inválidas
- **500 Internal Server Error:** Erro interno do servidor

---

### 3. Renovar Token

Renova o token de acesso usando o refresh token.

**Endpoint:** `POST /session/refresh`

**Autenticação:** Requer cookie `refreshToken`

**Parâmetros:** Nenhum (utiliza cookie)

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3333/session/refresh \
  -H "Content-Type: application/json" \
  --cookie "refreshToken=seu-refresh-token"
```

**Resposta de Sucesso:**
- **Status:** 200 OK
- **Body:**
```json
{
  "token": "novo-jwt-token",
  "user": {
    "id": "uuid-do-usuario",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```
- **Cookies:** Atualiza o cookie `refresh_token`

**Possíveis Erros:**
- **400 Bad Request:** Token inválido ou expirado
- **500 Internal Server Error:** Erro interno do servidor

---

## 📝 Endpoints de Posts

> **Nota:** Todos os endpoints de posts requerem autenticação via JWT.

### 1. Criar Post

Cria um novo post no feed.

**Endpoint:** `POST /post`

**Autenticação:** Requerida (JWT)

**Parâmetros do Body:**
```json
{
  "content": "string (obrigatório)"
}
```

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3333/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-jwt-token" \
  -d '{
    "content": "Este é o conteúdo do meu novo post!"
  }'
```

**Resposta de Sucesso:**
- **Status:** 201 Created
- **Body:** Vazio

**Possíveis Erros:**
- **400 Bad Request:** Dados inválidos
- **401 Unauthorized:** Token inválido ou ausente
- **500 Internal Server Error:** Erro interno do servidor

---

### 2. Buscar Posts

Retorna uma lista paginada de posts do feed.

**Endpoint:** `GET /post`

**Autenticação:** Requerida (JWT)

**Parâmetros de Query:**
- `page`: number (opcional, padrão: 1, mínimo: 1)
- `limit`: number (opcional, padrão: 10, mínimo: 1, máximo: 100)

**Exemplo de Requisição:**
```bash
curl -X GET "http://localhost:3333/post?page=1&limit=20" \
  -H "Authorization: Bearer seu-jwt-token"
```

**Resposta de Sucesso:**
- **Status:** 200 OK
- **Body:**
```json
{
  "posts": [
    {
      "id": 1,
      "content": "Conteúdo do post",
      "published": true,
      "authorId": "uuid-do-autor",
      "createdAt": "2025-07-13T10:00:00.000Z",
      "updatedAt": "2025-07-13T10:00:00.000Z",
      "author": {
        "id": "uuid-do-autor",
        "name": "Nome do Autor",
        "email": "autor@example.com"
      }
    }
  ],
  "page": 1,
  "limit": 20
}
```

**Possíveis Erros:**
- **400 Bad Request:** Parâmetros de query inválidos
- **401 Unauthorized:** Token inválido ou ausente
- **500 Internal Server Error:** Erro interno do servidor

---

### 3. Atualizar Post

Atualiza o conteúdo de um post existente.

**Endpoint:** `PUT /post/:postId`

**Autenticação:** Requerida (JWT)

**Parâmetros da URL:**
- `postId`: number (obrigatório, ID do post)

**Parâmetros do Body:**
```json
{
  "content": "string (obrigatório)"
}
```

**Exemplo de Requisição:**
```bash
curl -X PUT http://localhost:3333/post/123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-jwt-token" \
  -d '{
    "content": "Conteúdo atualizado do post"
  }'
```

**Resposta de Sucesso:**
- **Status:** 204 No Content
- **Body:** Vazio

**Possíveis Erros:**
- **400 Bad Request:** Dados inválidos ou post não encontrado
- **401 Unauthorized:** Token inválido ou ausente
- **403 Forbidden:** Usuário não tem permissão para editar este post
- **500 Internal Server Error:** Erro interno do servidor

---

### 4. Deletar Post

Remove um post do feed.

**Endpoint:** `DELETE /post/:postId`

**Autenticação:** Requerida (JWT)

**Parâmetros da URL:**
- `postId`: number (obrigatório, ID do post)

**Exemplo de Requisição:**
```bash
curl -X DELETE http://localhost:3333/post/123 \
  -H "Authorization: Bearer seu-jwt-token"
```

**Resposta de Sucesso:**
- **Status:** 204 No Content
- **Body:** Vazio

**Possíveis Erros:**
- **400 Bad Request:** Post não encontrado
- **401 Unauthorized:** Token inválido ou ausente
- **403 Forbidden:** Usuário não tem permissão para deletar este post
- **500 Internal Server Error:** Erro interno do servidor

---

## 🔧 Códigos de Status HTTP

| Status | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Requisição bem-sucedida, sem conteúdo de retorno |
| 400 | Bad Request - Dados da requisição inválidos |
| 401 | Unauthorized - Autenticação necessária ou inválida |
| 403 | Forbidden - Sem permissão para acessar o recurso |
| 500 | Internal Server Error - Erro interno do servidor |

## 🔐 Middleware de Autenticação

Os endpoints de posts utilizam middleware de autenticação JWT que:

1. Verifica a presença do token no cabeçalho `Authorization`
2. Valida a assinatura e expiração do token
3. Extrai o ID do usuário do token e o disponibiliza em `req.user.sub`

## 📊 Modelo de Dados

### User (Usuário)
```typescript
{
  id: string (UUID)
  email: string (único)
  name: string
  passwordHash: string
  createdAt: DateTime
  updatedAt: DateTime?
  posts: Post[]
}
```

### Post
```typescript
{
  id: number (auto-increment)
  content: string
  published: boolean (padrão: true)
  authorId: string (FK para User.id)
  author: User
  createdAt: DateTime
  updatedAt: DateTime?
}
```

## 💡 Exemplos de Uso

### Fluxo Completo de Autenticação e Criação de Post

1. **Registrar usuário:**
```bash
curl -X POST http://localhost:3333/register \
  -H "Content-Type: application/json" \
  -d '{"name": "João", "email": "joao@test.com", "password": "123456"}'
```

2. **Fazer login:**
```bash
curl -X POST http://localhost:3333/session \
  -H "Content-Type: application/json" \
  -d '{"email": "joao@test.com", "password": "123456"}'
```

3. **Criar post (usar o token da resposta anterior):**
```bash
curl -X POST http://localhost:3333/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"content": "Meu primeiro post!"}'
```

4. **Buscar posts:**
```bash
curl -X GET http://localhost:3333/post \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🚨 Notas Importantes

- Tokens JWT expiram em 6 horas para login inicial
- Refresh tokens expiram em 7 dias
- Usuários só podem editar/deletar seus próprios posts
- Todas as senhas são criptografadas antes de serem armazenadas
- A API suporta CORS para desenvolvimento frontend
