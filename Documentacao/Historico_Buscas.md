# 🔎 Histórico de Buscas

## 🎯 Objetivo
Registrar automaticamente todas as pesquisas feitas pelo usuário e fornecer dados analíticos para o dashboard.

## 🧱 Estrutura
- Entidade: `SearchHistory`
- Atributos: `query`, `movie_id`, `searchedAt`, `genre`, `year`, `decade`

## ⚙️ Funcionamento
1. A cada busca, cria-se um novo registro.
2. Caso o filme exista no banco, o `movie_id` é referenciado.
3. Informações derivadas (`year`, `genre`, `decade`) são armazenadas para facilitar consultas analíticas.

## 🧠 Estratégias
- Denormalização de atributos para consultas rápidas.
- Ordenação padrão por `searchedAt DESC`.

## 🔍 Exemplo
```ts
await SearchHistoryService.create({
  query: "Inception",
  movie_id: 42,
  genre: "Sci-Fi",
  decade: "2010",
});
```