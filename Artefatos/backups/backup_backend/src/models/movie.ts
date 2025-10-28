import type { Sequelize, Optional } from 'sequelize';
import { Model,DataTypes  } from 'sequelize';

// As interfaces são uma ótima prática e foram mantidas
export interface MovieAttributes {
  id: number;
  imdbID: string;
  title: string;
  year: number;
  decade: number;
  plot?: string;
  genre?: string;
  rated?: string;
  runtime?: string;
  director?: string;
  actors?: string;
  poster?: string;
  imdbRating?: number;
  ratings?: object;
  type?: string;
}

// Interface para os atributos na hora da criação, tornando o 'id' opcional
type MovieCreationAttributes = Optional<MovieAttributes, 'id'>;

// A classe agora é exportada diretamente
export class Movie extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes {
  // Atributos da instância
  declare id: number;
  declare imdbID: string;
  declare title: string;
  declare year: number;
  declare decade: number;
  declare plot: string;
  declare genre: string;
  declare rated: string;
  declare runtime: string;
  declare director: string;
  declare actors: string;
  declare poster: string;
  declare imdbRating: number;
  declare ratings: object;
  declare type: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Método estático para definir as associações
  public static associate(models: any) {
    Movie.hasMany(models.Favorite, { foreignKey: 'movies_id' });
    Movie.hasMany(models.Review, { foreignKey: 'movie_id' });
    Movie.hasMany(models.SearchHistory, { foreignKey: 'movies_id' });
  }

  // Método estático para inicializar o modelo
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        imdbID: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        decade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        plot: DataTypes.TEXT,
        genre: DataTypes.STRING,
        rated: DataTypes.STRING,
        runtime: DataTypes.STRING,
        director: DataTypes.STRING,
        actors: DataTypes.STRING,
        poster: DataTypes.STRING,
        imdbRating: DataTypes.DECIMAL(3, 1),
        ratings: DataTypes.JSON,
        type: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Movie',
        tableName: 'Movies',
        timestamps: true,
      }
    );
  }
}

export default Movie;