# 📊 Dashboard

## 🎯 Objetivo
Consolidar métricas sobre comportamento do usuário e preferências cinematográficas.

## 🧱 Estrutura
- Fonte: `Movies`, `SearchHistory`, `Favorites`, `Reviews`
- Processamento: consultas SQL agregadas e cálculos estatísticos

## ⚙️ Métricas geradas
- Total de filmes pesquisados
- Gênero mais buscado
- Década mais assistida
- Nota média das avaliações
- Distribuição por ano

## 🧠 Estratégias
- Denormalização reduz tempo de agregação.
- Requisições otimizadas (Evita joins desnecessários).

## 🔍 Exemplo
```ts
const CrudService = require('./crud.service');
const models = require('../models');

class StatsService extends CrudService {
  constructor() {
    super(models.SearchHistory);
  }

  async count(options) {

    const movies = await models.Movie.findAll({ ... })

    const pesquisas = await this.model.findAll({ ... });

    const favorites = await models.Favorite.findAll({ ... });

    const reviews = await models.Review.findAll({ ... });

    return {
      movies: movies[0].dataValues.count,
      pesquisas: pesquisas[0].dataValues.count,
      favorites: favorites[0].dataValues.count,
      reviews: reviews[0].dataValues.count,
    };
  }

  async countGenrers(options) { ...  };

  async countTypes(options) { ... }

  async favoriteDecades(options) { ... }

  async reviewMedia(options) { ... }

  async yearsSearchs(options) { ... }
}

module.exports = new StatsService();

```