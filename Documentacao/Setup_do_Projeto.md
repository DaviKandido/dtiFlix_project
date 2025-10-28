# ⚙️ Setup do Projeto — dtiFlix

O **dtiFlix** é uma aplicação **Full Stack** (Next.js + Node.js + Sequelize + PostgreSQL + Redis) que consome a **OMDb API** para exibir informações sobre filmes, com recursos de favoritos, reviews e dashboard de estatísticas.

Este guia explica passo a passo como configurar o ambiente e executar o projeto localmente.

---

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

| Ferramenta                  | Versão recomendada    | Instalação                                                        |
| --------------------------- | --------------------- | ----------------------------------------------------------------- |
| **Node.js**                 | ≥ 20.x                | [Node.js Downloads](https://nodejs.org/en/download/)              |
| **npm** ou **yarn**         | ≥ 10.x                | Incluído com o Node                                               |
| **Docker + Docker Compose** | ≥ 24.x                | [Docker Desktop](https://www.docker.com/products/docker-desktop/) |
| **PostgreSQL**              | ≥ 15 (ou via Docker)  | Opcional (recomendado via container)                              |
| **Redis**                   | ≥ 7.x (ou via Docker) | Opcional (recomendado via container)                              |

---

## 🧱 Estrutura do Projeto

```
dtiflix/
├── backend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    ├── .env.local
    ├── package.json
    └── README.md
```

---

## 🐘 Banco de Dados e Redis via Docker

### 1️⃣ Criar containers

Verifique se o arquivo `docker-compose.yml` esta configurado corretamente.
```bash
services:
  postgres-seguro:
    container_name: postgres-seguro
    image: postgres:17
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data

  # Adicione o serviço do Redis (Cache)
  redis:
    image: "redis:alpine"
    container_name: redis-cache
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
    driver: local
  redis-data:
```

Execute no terminal:

```bash
docker compose up -d # Windows
sudo docker compose up -d # Linux
```

Verifique se sua versão do docker-compose exigi:

```bash
docker-compose up -d # Windows
sudo docker-compose up -d # Linux
```

> ⚠️ Esses nomes (“postgres-seguro” e “redis-cache”) são usados nas configurações do backend — mantenha-os iguais.

---

## 🔐 Configuração de variáveis de ambiente

### 📁 Backend — `backend/.env`

Crie um arquivo `.env` dentro da pasta `backend`:

```env
# Configuração do Banco de Dados PostgreSQL (Local)
POSTGRES_PORT=5432
POSTGRES_PASSWORD=docker
POSTGRES_USER=postgres
POSTGRES_DB=dtiflix_db
NODE_ENV=development
OMDB_API_KEY=989152b3
REDIS_URL=redis://localhost:6379

# URL do Frontend (Aplicação que vai consumir a API)
Frontend_URL=http://localhost:3000

# Porta em que o Backend (esta API) vai rodar
PORT=5000
```

> ⚠️ Essas configurações devem ser iguais nas configurações do frontend.

> ⚠️ Caso OMDB_API_KEY inspira, acesse o site da OMDb para obter uma chave válida.

---

## 📦 Instalação das dependências

### 🧩 Backend

```bash
cd backend
npm install
```

### 💻 Frontend

```bash
cd frontend
cd dtiflix    # Atenção para a essa pasta a mais
npm install
```

---

## 🗃️ Configuração do Banco de Dados

O backend já vem com scripts no `package.json` para gerenciar o banco via Docker e Sequelize.

### Inicializar banco e aplicar migrations:

```bash
npm run db:reset
```

Isso executará:

* `db:drop` → Remove o banco anterior
* `db:create` → Cria um novo banco
* `db:migrate` → Executa as migrations
* `db:seed` → Popula com dados iniciais (se houver)

---

## 🚀 Executando o projeto

### 🖥️ Iniciar Backend

```bash
cd backend
npm run dev
```

O servidor iniciará em:

```
http://localhost:5000
```

Swagger (documentação da API):

```
http://localhost:5000/api/docs
```

---

### 🌐 Iniciar Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em:

```
http://localhost:3000
```

---

## 🔁 Testando o fluxo completo

1. Acesse o frontend (`http://localhost:3000`)
2. Pesquise um filme — o backend:

   * Verifica no **Redis**
   * Caso não exista, busca na **OMDb API**
   * Salva em **Movies**
3. Você poderá:

   * Favoritar um filme
   * Avaliar e comentar
   * Ver estatísticas no Dashboard
   * Visualizar histórico de pesquisas

---

## 🧹 Ferramentas de Desenvolvimento

### Lint e formatação

```bash
npm run lint
npm run lint:fix
npm run format
```

### Recarregar banco de dados manualmente

```bash
npm run db:drop
npm run db:create
npm run db:migrate
npm run db:seed
```

---

## 📊 Documentação da API

A API é documentada automaticamente via **Swagger JSDoc**.

Acesse:

```
http://localhost:5000/api/docs
```

---

## 🧠 Troubleshooting

| Erro                                                | Solução                                                                                                    |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ECONNREFUSED: connect ECONNREFUSED 127.0.0.1:5432` | Verifique se o container do PostgreSQL está rodando                                                        |
| `Redis connection failed`                           | Confirme se o Redis está ativo (`docker ps`)                                                               |
| `OMDb API Key Invalid`                              | Gere uma nova chave gratuita em [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) |
| `SequelizeConnectionError`                          | Revise as credenciais do banco no `.env`                                                                   |
| `Next.js image domain error`                        | Adicione o domínio da imagem ao `next.config.js`                                                           |

---

## 🧰 Comandos úteis (Docker)

Listar containers:

```bash
docker ps
```

Ver logs:

```bash
docker logs postgres-seguro
docker logs redis-cache
```

Parar containers:

```bash
docker stop postgres-seguro redis-cache
```

Remover containers:

```bash
docker rm -f postgres-seguro redis-cache
```

---

## ✅ Checklist rápido de funcionamento

| Etapa                             | Status esperado |
| --------------------------------- | --------------- |
| Backend sobe em `localhost:5000`  | ✅               |
| Frontend sobe em `localhost:3000` | ✅               |
| Swagger acessível em `/docs`      | ✅               |
| Filme buscado é salvo e cacheado  | ✅               |
| Dashboard exibe estatísticas      | ✅               |


* Veja a documentação completa em: http://localhost:5000/api/docs/
* Ou acesse o Swagger em: http://localhost:5000/api/docs-swagger
---

## 👨‍💻 Autor

**Davi Cândido de Almeida**
💼 Desenvolvedor Full Stack
🔗 [GitHub](https://github.com/DaviKandido)