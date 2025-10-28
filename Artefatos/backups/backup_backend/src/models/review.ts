import type { Sequelize, Optional } from 'sequelize';
import { Model,DataTypes  } from 'sequelize';

// Interface para os atributos do modelo
export interface ReviewAttributes {
  id: number;
  movie_id: number;
  comment?: string | null;
  rating?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// Interface para os atributos de criação, tornando alguns campos opcionais
type ReviewCreationAttributes = Optional<
  ReviewAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'comment' | 'rating'
>;

// A classe agora é exportada diretamente
export class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  // Atributos da instância
  public id!: number;
  public movie_id!: number;
  public comment!: string | null;
  public rating!: number | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  // Método estático para definir as associações
  public static associate(models: any) {
    // Uma Review pertence a um Filme
    Review.belongsTo(models.Movie, { foreignKey: 'movie_id' });
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
        movie_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        rating: {
          type: DataTypes.DECIMAL(2, 1),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Reviews',
        modelName: 'Review',
        timestamps: true, // Ativa createdAt e updatedAt
        paranoid: true,   // Ativa o soft delete (usa a coluna 'deletedAt')
      }
    );
  }
}

export default Review