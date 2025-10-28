# ✅ Teste e Qualidade

## 🎯 Objetivo
Assegurar estabilidade e previsibilidade através de validações, testes e boas práticas de código.

## 🧱 Estratégias adotadas
- **Validação de entradas:** `Zod` em endpoints de criação e atualização.
- **Lint & Format:** `ESLint + Prettier`
- **Tipagem segura:** `TypeScript`
- **Soft delete controlado:** evita perda de dados.
- **Padronização de responses:** middlewares de erro (`ApiError`).

## ⚙️ Tipos de teste
- Unitários: serviços isolados.
- Integração: fluxo completo de busca e cache.
- Testes via Swagger manualmente.

## 🔍 Exemplo (validação Zod)
```ts
const ReviewSchema = z.object({
  movie_id: z.number(),
  rating: z.coerce.number().min(0).max(5),
  comment: z.string().optional(),
});
