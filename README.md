# 🎥 dtiFlix

## 🎬 Sobre o Projeto

O **dtiFlix** é uma aplicação web full stack.
Seu objetivo é permitir que o usuário busque filmes na **OMDb API**, favorite suas obrar preferidos, registre avaliações pessoais e visualize estatísticas sobre seus hábitos cinematográficos.

A aplicação foi construída com **Next.js (React + TypeScript + Material UI/Tailwind + Magic UI + Recharts)** no frontend e **Node.js + Express + Sequelize + PostgreSQL + Docker + Swagger** no backend, adotando uma arquitetura organizada e desacoplada baseada em camadas de controle, modelagem e persistência **(MVC - Model-View-Controller)**.
Os dados persistem em um banco relacional, garantindo histórico completo de buscas e interações do usuário.

### Destaques da solução:

- 🔎 **Busca de filmes** integrada à OMDb API, com registro automático no histórico.
- ⭐ **Sistema de favoritos e avaliações**, com soft delete (`deletedAt`) para preservar o histórico.
- 📈 **Dashboard “Meus Dados”** com estatísticas pessoais, como:
  - Total de filmes buscados
  - Gênero mais pesquisado
  - Década preferida
  - Nota média das avaliações
  - Distribuição de anos dos filmes buscados
- 💾 **Persistência com Sequelize e PostgreSQL**, incluindo associações entre filmes, favoritos, avaliações e histórico de buscas.
- 🧩 **Frontend responsivo**, utilizando Material UI, Magic Ui, Origin Ui e bibliotecas de gráficos como o (Recharts) para visualizações intuitivas.
- ⚙️ **Desnormalizações**, otimizar consultas analíticas no dashboard, reduzindo o número de joins e melhorando a performance em agregações.
- ⚡ **Cache sob demanda**, estrategia utilizada no backend para armazenar temporariamente respostas da OMDb API, minimizando chamadas repetidas e garantindo melhor tempo de resposta a buscas frequentes.

> 📄 Detalhes sobre o infraestrutura do projeto podem ser encotrados em [`Documentacao/Infraestrutura_Documentacao.md`](./Documentacao/Infraestrutura_Documentacao.md).

> 📄 Detalhes sobre o setup do projeto podem ser encotrados em [`Documentacao/Setup_do_Projeto.md`](./Documentacao/Setup_do_Projeto.md).

> **Atenção:** A estrategia de cache foi implementada visando melhorar a experiencia do usuario e otimizar o desempenho da aplicação, no entanto, buscas de filmes irrelevantes (antes não pesquisados) podem demorar mais do que o esperado, no entanto o cache garante que buscas frequentes sejam respondidas rapidamente, quase que instantaneamente.

A proposta é fornecer uma ferramenta simples, mas analítica, que transforma o consumo de filmes em insights sobre o comportamento e preferências do usuário.

---

## 📚 Índice

- [🎥 dtiFlix](#-dtiflix)
  - [🎬 Sobre o Projeto](#-sobre-o-projeto)
    - [Destaques da solução:](#destaques-da-solução)
  - [📚 Índice](#-índice)
  - [🏗️ Arquitetura e Tecnologias](#️-arquitetura-e-tecnologias)
  - [🧩 Módulos e Documentação](#-módulos-e-documentação)
  - [📅 Planejamento e Desenvolvimento](#-planejamento-e-desenvolvimento)
  - [⚙️ Setup do Projeto](#️-setup-do-projeto)
  - [💡 **Respostas para as perguntas**](#-respostas-para-as-perguntas)
      - [🧠 **Qual foi o maior desafio técnico?**](#-qual-foi-o-maior-desafio-técnico)
      - [🗂️ **Como você organizou e estruturou os dados coletados?**](#️-como-você-organizou-e-estruturou-os-dados-coletados)
      - [📊 **Que insights interessantes o dashboard poderia oferecer?**](#-que-insights-interessantes-o-dashboard-poderia-oferecer)
      - [⏰ **O que faria diferente com mais tempo?**](#-o-que-faria-diferente-com-mais-tempo)
      - [⚙️ **Quais ferramentas/aceleradores de desenvolvimento utilizou?**](#️-quais-ferramentasaceleradores-de-desenvolvimento-utilizou)
  - [✨ Autor](#-autor)
  - [🧾 Licença](#-licença)

---

## 🏗️ Arquitetura e Tecnologias

- **Frontend:** Next.js (React + TypeScript)
- **Backend:** Node.js + Express
- **ORM:** Sequelize
- **Banco de dados:** Docker + PostgreSQL
- **Cache:** Redis
- **Validador de dados:** Zod
- **UI Library:** Material UI, Tailwind, Magic UI
- **Gráficos:** Recharts
- **Documentação:** Markdown modular + Swagger (OpenAPI)

> 📄 Mais detalhes de infraestrutura e decisões de arquitetura em [`Documentacao/Infraestrutura_Documentacao.md`](./Documentacao/Infraestrutura_Documentacao.md).

---

## 🧩 Módulos e Documentação

Cada parte do sistema foi documentada de forma independente para facilitar o entendimento e a manutenção do projeto:

| Módulo                      | Descrição                                                                   | Link                                                                             |
| --------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Planejamento do Projeto** | Explica o processo de planejamento e desenvolvimento do projeto             | [`Documentacao/Planejamento.md`](./Documentacao/Planejamento.md)                 |
| **Setup do Projeto**        | Explica o processo de setup do projeto e arquitetura do backend.            | [`Documentacao/Setup_do_Projeto.md`](./Documentacao/Setup_do_Projeto.md)         |
| **Integração OMDb**         | Explica como é feita a comunicação com a API externa e o cache sob demanda. | [`Documentacao/Integracao_OMDB.md`](./Documentacao/Integracao_OMDB.md)           |
| **Histórico de Buscas**     | Descreve o modelo, coleta automática e uso de dados para o dashboard.       | [`Documentacao/Historico_Buscas.md`](./Documentacao/Historico_Buscas.md)         |
| **Módulo de Favoritos**     | Define as operações CRUD, soft delete e métricas derivadas.                 | [`Documentacao/Modulo_Favoritos.md`](./Documentacao/Modulo_Favoritos.md)         |
| **Módulo de Avaliações**    | Estrutura de avaliações, edição, exclusão e nota média.                     | [`Documentacao/Modulo_Avaliacoes.md`](./Documentacao/Modulo_Avaliacoes.md)       |
| **Dashboard**               | Explica as estatísticas calculadas e a visualização gráfica dos dados.      | [`Documentacao/Dashboard.md`](./Documentacao/Dashboard.md)                       |
| **UI e UX**                 | Detalha decisões de design, responsividade e experiência do usuário.        | [`Documentacao/UI_UX_responsividade.md`](./Documentacao/UI_UX_responsividade.md) |
| **Teste e Qualidade**       | Estratégia de testes, validação de entradas e tratamento de erros.          | [`Documentacao/Teste_Qualidade.md`](./Documentacao/Teste_Qualidade.md)           |

> ⚠️ Atenção: Garanta que na etapa de setup do projeto, todos os requisitos foram cumpridos, incluindo as variaveis de ambiente.

---

## 📅 Planejamento e Desenvolvimento

O planejamento detalha as etapas de desenvolvimento, organização de tarefas e backlog definido no Jira.
Cada etapa do ciclo (planejamento → implementação → validação → documentação) foi descrita em:
📄 [`Documentacao/Planejamento.md`](./Documentacao/Planejamento.md)

---

## ⚙️ Setup do Projeto

Para execução local, veja o guia passo a passo em:

📄 [`Documentacao/Setup_do_Projeto.md`](./Documentacao/Setup_do_Projeto.md)

---

## 💡 **Respostas para as perguntas**

---

#### 🧠 **Qual foi o maior desafio técnico?**

Acredito que os meus maiores desafios foram estrutara a logica de integração da estrategia de **cache sub demanda**
nas buscas de filmes. Foi necessário equilibrar **desempenho, consistência e integridade dos dados** ao mesmo tempo que garantir que buscas repetidas fossem rapidamente retornadas do cache (Redis), enquanto novas consultas fossem atualizadas e persistidas no banco.
Além disso, a **normalização e desnormalização seletiva das tabelas** para suportar o dashboard analítico também exigiu um bom planejamento de modelagem de dados, especialmente na integração entre históricos de busca, favoritos e avaliações

---

#### 🗂️ **Como você organizou e estruturou os dados coletados?**

- Os dados foram estruturados em um **modelo relacional** baseado no diagrama entidade-relacionamento (**Movies**, **SearchHistory**, **Favorites**, **Reviews**).
  Cada entidade cumpre um papel bem definido:

  Cada entidade cumpre um papel bem definido:

  - **Movies** → Armazena dados vindos da OMDb API (título, ano, gênero, etc.) **[API -> CACHE -> DB -> API -> UI]**
  - **SearchHistory** → Registra todas as buscas feitas pelo usuário, com redundâncias (gênero, década, ano) para facilitar agregações
  - **Favorites** → Implementa soft delete (deletedAt) para preservar histórico de favoritos
  - **Reviews** → Centraliza notas e comentários, permitindo calcular médias e estatísticas

Essa estrutura foi projetada para **reduzir joins complexos** no dashboard e melhorar a performance das consultas analíticas.

#### 📊 **Que insights interessantes o dashboard poderia oferecer?**

O dashboard oferece **métricas comportamentais** que transformam o uso cotidiano do app em informações analíticas, como:

- 🎞️ **Filmes mais buscados** e **gêneros preferidos**
- ⏳ **Década de filmes mais assistida** (ex: anos 90, 2000s, etc.)
- ⭐ **Nota média das avaliações**
- 🕵️ **Correlação entre gêneros avaliados e notas atribuídas**
- 📈 **Evolução de interesse ao longo do tempo** (buscas por ano, etc.)

Esses insights poderiam inclusive evoluir para **recomendações personalizadas** no futuro, com base nos padrões de busca e avaliação de cada usuário.

- O que faria diferente com mais tempo?
- Quais ferramentas/aceleradores de desenvolvimento utilizou? (ex.: GPT, Cursor, et

---

#### ⏰ **O que faria diferente com mais tempo?**

Com mais tempo, eu:

1. **Implementaria autenticação de usuários**, permitindo dashboards personalizados **(JWT + Bearer Token + Brycpt + Cookies)**.
2. Refinaria o **design system do frontend**, consolidando componentes reutilizáveis com uma identidade visual única.
3. Otimizaria o cache com **expiração inteligente** e políticas baseadas em frequência de acesso.
4. Adicionaria uma camada de **observabilidade (logs)** para monitorar desempenho real do backend e comportamentos dos usuários.

---

#### ⚙️ **Quais ferramentas/aceleradores de desenvolvimento utilizou?**

Durante o desenvolvimento, utilizei diversas ferramentas que ajudaram a acelerar a entrega:

| Categoria                      | Ferramenta / Acelerador                      | Uso                                                              |
| ------------------------------ | -------------------------------------------- | ---------------------------------------------------------------- |
| **IA e Assistentes de Código** | **ChatGPT (GPT-5)**, **GEMINI**              | Auxílio em refatoração, documentação e duvidas técnicas.         |
| **Modelagem e Banco de Dados** | **MySQL Workbench**, **Miro**                | Criação e documentação do modelo entidade-relacionamento.        |
| **Gerenciamento de Tarefas**   | **Jira Software (Kanban, Scrum)**            | Organização de backlog, tarefas e progresso do projeto.          |
| **Controle de Versão**         | **Git + GitHub (GitFlow)**                   | Estrutura de branches, commits semânticos e versionamento limpo. |
| **Documentação**               | **Swagger + Markdown Docs**                  | Registro de endpoints e documentação modular.                    |
| **Frontend**                   | **Next.js + Tailwind + Magic UI + Recharts** | Criação rápida de interfaces responsivas e dashboards visuais.   |
| **Backend**                    | **Express + Sequelize + Redis**              | Implementação da API REST, ORM e cache sob demanda.              |

> ⚠️ Atenção: Garanta que na etapa de setup do projeto, todos os requisitos foram cumpridos, incluindo as variaveis de ambiente.

---

## ✨ Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/daviKandido" style="text-decoration: none; color: #984AE2;">
        <img 
          src="https://avatars.githubusercontent.com/u/161776341?v=4"
          width="120px"
          alt="Foto de Davi Cândido de Almeida"
          style="border-radius: 20%;
                 padding: 3px;
                 background: linear-gradient(135deg, #8A2BE2, #FF1493, #984AE2);
                 display: inline-block;"
        /><br>
        <sub><b>Davi Cândido de Almeida</b></sub>
      </a>
      <br><br>
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
        <a href="https://github.com/daviKandido" title="GitHub">
          <img src="https://skillicons.dev/icons?i=github" width="28" alt="GitHub"/>
        </a>
        <a href="https://www.linkedin.com/in/davi-candido-de-almeida" title="LinkedIn">
          <img src="https://skillicons.dev/icons?i=linkedin" width="28" alt="LinkedIn"/>
        </a>
      </div>
    </td>
  </tr>
</table>

---

## 🧾 Licença
Código e documentação sob a licença padrão CC BY 4.0.
📄 [`LICENSE`](./LICENSE)

