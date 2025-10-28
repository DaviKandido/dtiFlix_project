# 🎥 Integração OMDb

## 🎯 Objetivo
Responsável por buscar filmes na **OMDb API** e armazenar os resultados localmente, implementando um **cache sob demanda** com Redis para otimizar o desempenho.

## 🧱 Estrutura
- Serviço: `MovieService`
- Entidade: `Movies`
- Dependências: `axios`, `redis`, `Sequelize`

## ⚙️ Funcionamento
1. O usuário pesquisa um filme.
2. O backend verifica o cache Redis.
3. Caso não exista, consulta a **OMDb API**.
4. Salva os dados retornados na tabela `Movies`.
5. Retorna o filme e armazena a resposta no cache.

## 🧠 Estratégias
- Cache sub damanda configurado para 30 minutos.
- Prevenção de chamadas redundantes à OMDb.
- Otimização de desempenho.
- Garantindo integridade.

## 🔍 Exemplo de uso
```ts
// Veja os exemplos em:

const movie = await MovieService.getByTitle("Inception");
const movie = await MovieService.getOneByImdbID("tt1375666", "Inception");
```

### Exemplo da inplementação do cache sob demanda:

```ts

import [...] from libs

class MovieService extends CrudService {
  constructor() {
    super(models.Movie);
  }

  async findOneByImdbID(imdbID, queryTerm = null) {
    const cacheKey = `movie:${imdbID}`;

    // 1º Verifica o cache
    const cachedMovie = await redisClient.get(cacheKey);
    if (cachedMovie) {
      console.log(`CACHE HIT for ${cacheKey}`);
      const parded = JSON.parse(cachedMovie);
      await searchService.registerSearchHistory(parded, queryTerm);
      return parded;
    }

    console.log(`CACHE MISS for ${cacheKey}`);
    // 2º Verifica o banco local
    const movieFromDB = await this.model.findOne({ where: { imdbID: imdbID } });
    // Verifica se o filme foi criado recentemente
    if (movieFromDB) {
      console.log(`DB HIT for ${imdbID}`);
      await searchService.registerSearchHistory(movieFromDB, queryTerm);
      await redisClient.set(cacheKey, JSON.stringify(movieFromDB.get({ plain: true })), {
        EX: 60 * 30,
      }); // 30min de expiração
      return movieFromDB;
    }

    console.log(`DB MISS for ${imdbID}`);
    // 3º Verifica na API[OMDb]
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
    );
    const movieData = response.data;
    if (!movieData || movieData.Response === 'False') return null;

    const newMovie = await this._createMovieFromApi(movieData, queryTerm);

    await redisClient.set(cacheKey, JSON.stringify(newMovie.get({ plain: true })), { EX: 60 * 30 }); // 30min de expiração

    return newMovie;
  }

  // Cria o novo filme no seu banco de dados
  async _createMovieFromApi(movieData, queryTerm) {
    return await sequelize.transaction(async (t) => {
      // Calcula a década
      const year = parseInt(movieData.Year, 10);
      const decade = Math.floor(year / 10) * 10;

      const movie = await this.model.create(
        {
          imdbID: movieData.imdbID,
          title: movieData.Title,
          year: year,
          decade: decade,
          plot: movieData.Plot,
          genre: movieData.Genre,
          rated: movieData.Rated,
          runtime: movieData.Runtime,
          director: movieData.Director,
          actors: movieData.Actors,
          poster: movieData.Poster,
          imdbRating: parseFloat(movieData.imdbRating) || 0,
          ratings: movieData.Ratings,
          type: movieData.Type,
        },
        { transaction: t }
      );
      await searchService.registerSearchHistory(movie, queryTerm, t);

      return movie;
    });
  }

  // Busca inteligente de filmes VERIFICA EXITENCIAS API -> CACHE -> DB -> API
  async getByTitle(title, options) {
    let moviesApi = [];

    const response = await axios.get(
      `http://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`
    );
    const movieData = response.data;
    if (!movieData || movieData.Response === 'False') return null;

    if (movieData.Search && movieData.Search.length > 0) {
      for (const movie of movieData.Search) {
        const newMovie = await this.findOneByImdbID(movie.imdbID, title);
        moviesApi.push(newMovie);
      }
    } else {
      // Busca no banco de forma bruca caso não encontre na API
      const moviesBD = await this.model.findAll({
        where: { title: { [Op.iLike]: `%${title}%` }, ...options },
      });
      if (moviesBD && moviesBD.length > 0) {
        await searchService.registerSearchHistory(moviesBD[0], title);
      }
      return moviesBD;
    }

    if (moviesApi.length === 0) return null;

    return moviesApi;
  }

  [...]
}

module.exports = new MovieService();

```