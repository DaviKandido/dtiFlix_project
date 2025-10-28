import type { Sequelize, Optional } from 'sequelize';
import { Model,DataTypes  } from 'sequelize';

// Interface para os atributos do modelo
export interface FavoriteAttributes {
  id: number;
  movies_id: number;
  createdAt?: Date;
  deletedAt?: Date | null;
}

// Interface para os atributos de criação (torna 'id', 'createdAt', 'deletedAt' opcionais)
type FavoriteCreationAttributes = Optional<FavoriteAttributes, 'id' | 'createdAt' | 'deletedAt'>;

// A classe agora é exportada diretamente
export class Favorite
  extends Model<FavoriteAttributes, FavoriteCreationAttributes>
  implements FavoriteAttributes
{
  // Atributos da instância
  declare id: number;
  declare movies_id: number;

  // Timestamps (gerenciados pelo Sequelize)
  declare readonly createdAt: Date;
  declare readonly deletedAt: Date | null; // Para o soft delete (paranoid)

  // Método estático para definir as associações
  public static associate(models: any) {
    // Um Favorito pertence a um Filme
    Favorite.belongsTo(models.Movie, { foreignKey: 'movies_id' });
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
        movies_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true, // Garante que um filme só pode ser favoritado uma vez
        },
      },
      {
        sequelize,
        tableName: 'Favorites',
        modelName: 'Favorite',
        timestamps: true,   // Ativa os timestamps
        updatedAt: false,   // Desativa a coluna 'updatedAt'
        paranoid: true,     // Ativa o soft delete (usa a coluna 'deletedAt')
      }
    );
  }
}

export default Favorite