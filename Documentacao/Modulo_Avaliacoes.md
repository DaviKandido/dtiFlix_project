# 📝 Módulo de Avaliações

## 🎯 Objetivo
Gerenciar as avaliações e comentários atribuídos a cada filme pelo usuário.

## 🧱 Estrutura
- Entidade: `Reviews`
- Atributos: `movie_id`, `rating`, `comment`, `createdAt`, `updatedAt`, `deletedAt`

## ⚙️ Funcionamento
1. Usuário avalia um filme com nota e comentário.
2. É possível editar ou excluir (soft delete).
3. O backend calcula a média de notas (`AVG(rating)`).

## 🧠 Estratégias
- Soft delete preserva avaliações antigas.
- Notas médias agregadas alimentam o dashboard.

## 🔍 Exemplo
```ts
await ReviewService.create({
  movie_id: 12,
  rating: 4.5,
  comment: "Excelente fotografia e enredo envolvente!",
});

```