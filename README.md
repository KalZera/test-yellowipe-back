# 🚀 Como Iniciar o Projeto Yellowipe Backend

Este é um guia completo para configurar e executar o backend do projeto Yellowipe, uma API de feed de posts desenvolvida com Fastify, Prisma e PostgreSQL.

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## 🛠️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd test-yellowipe-back
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Configure as seguintes variáveis no arquivo `.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user-feeds?schema=public"

# JWT
JWT_SECRET="seu-jwt-secret-super-seguro-aqui"

# Server
PORT=3333
```

### 4. Inicie o banco de dados

Execute o PostgreSQL usando Docker:

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL com as seguintes configurações:
- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres
- **Senha**: postgres
- **Database**: user-feeds

### 5. Configure o banco de dados

Gere o cliente Prisma e execute as migrações:

```bash
# Gera o cliente Prisma
npm run db:generate

# Executa as migrações
npm run db:migrate
```

Ou execute ambos de uma vez:

```bash
npm run setup
```

## 🚀 Executando o Projeto

### Modo Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com hot reload:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

### Modo Produção

Para build e execução em produção:

```bash
# Build do projeto
npm run build

# Execução
npm run start
```

## 🧪 Executando os Testes

Execute os testes unitários:

```bash
npm test
```

Para executar os testes em modo watch:

```bash
npm test -- --watch
```

## 📊 Ferramentas de Desenvolvimento

### Prisma Studio

Para visualizar e editar dados do banco através de uma interface gráfica:

```bash
npm run db:studio
```

Acesse `http://localhost:5555` para usar o Prisma Studio.

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm run start` | Executa o projeto compilado |
| `npm test` | Executa os testes |
| `npm run db:generate` | Gera o cliente Prisma |
| `npm run db:migrate` | Executa as migrações do banco |
| `npm run db:studio` | Abre o Prisma Studio |
| `npm run setup` | Configuração inicial (generate + migrate) |

## 🔧 Estrutura do Projeto

```
src/
├── @types/           # Definições de tipos TypeScript
├── env/             # Configuração de variáveis de ambiente
├── http/            # Controllers e rotas HTTP
│   ├── controller/  # Controladores organizados por domínio
│   └── middleware/  # Middlewares da aplicação
├── lib/             # Configurações de bibliotecas
├── repositories/    # Camada de acesso a dados
├── tests/           # Testes unitários
└── use-cases/       # Casos de uso da aplicação
```

## 📡 Endpoints da API

### Autenticação

- `POST /register` - Registro de usuário
- `POST /session` - Login de usuário
- `POST /refresh` - Renovar token JWT

### Posts

- `GET /posts` - Listar posts do feed
- `POST /posts` - Criar novo post
- `PUT /posts/:id` - Atualizar post
- `DELETE /posts/:id` - Deletar post

## 🚨 Solução de Problemas

### Erro de conexão com o banco

Se você receber erros de conexão com o banco:

1. Verifique se o Docker está rodando:
   ```bash
   docker ps
   ```

2. Reinicie o container do banco:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

3. Verifique se a `DATABASE_URL` no `.env` está correta

### Erro no Prisma

Se houver problemas com o Prisma:

1. Regenere o cliente:
   ```bash
   npm run db:generate
   ```

2. Execute as migrações novamente:
   ```bash
   npm run db:migrate
   ```

### Erro de porta já em uso

Se a porta 3333 estiver em uso, altere a variável `PORT` no arquivo `.env` ou finalize o processo que está usando a porta:

```bash
# Encontrar processo usando a porta
lsof -i :3333

# Finalizar processo (substitua PID pelo ID do processo)
kill -9 PID
```

## 📝 Funcionalidades Implementadas

- ✅ Registro de usuário
- ✅ Autenticação com JWT
- ✅ CRUD de posts
- ✅ Feed de posts
- ✅ Validação de dados
- ✅ Testes unitários
- ✅ Middleware de autenticação

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

## Para acessar o Front end

- O front end to projeto está em outro repositório, para acessar clique [aqui](https://github.com/KalZera/test-yellowipe-front)