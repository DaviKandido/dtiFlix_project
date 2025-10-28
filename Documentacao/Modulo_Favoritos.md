# ⭐ Módulo de Favoritos

## 🎯 Objetivo

Permitir que o usuário favorite filmes, mantendo histórico mesmo após remoção (soft delete).

## 🧱 Estrutura

- Entidade: `Favorites`
- Atributos: `id`, `movie_id`, `createdAt`, `deletedAt`

## ⚙️ Funcionamento

1. O usuário marca um filme como favorito.
2. Caso já tenha sido removido antes, é restaurado.
3. O campo `deletedAt` é utilizado para soft delete.

## 🧠 Estratégias

- `deletedAt` ≠ `null` indica favorito removido.
- Filtros padrão ignoram registros deletados.

## 🔍 Exemplo

```ts
//Restoring previously deleted favorite

await favoriteRecord.restore();
```


