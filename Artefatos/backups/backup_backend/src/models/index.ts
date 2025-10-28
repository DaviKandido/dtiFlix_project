import { Sequelize } from 'sequelize';
import Movie from './movie.ts';
import Favorite from './favorite.ts';
import Review from './review.ts';
import SearchHistory from './searchhistory.ts';

// instancia do Sequelize
const sequelize = new Sequelize(process.env.POSTGRES_DB as string, {
  dialect: 'postgres',
  logging: false,
});

// inicializa os models
Movie.initialize(sequelize);
Favorite.initialize(sequelize);
Review.initialize(sequelize);
SearchHistory.initialize(sequelize);

// define associações (depois que todos estão inicializados)
Movie.associate({ Favorite, Review, SearchHistory });
Favorite.associate({ Movie });
Review.associate({ Movie });
SearchHistory.associate({ Movie });

// exporta tudo
export { sequelize, Movie, Favorite, Review, SearchHistory };