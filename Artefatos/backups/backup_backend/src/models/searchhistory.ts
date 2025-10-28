import type { Sequelize, Optional } from 'sequelize';
import { Model,DataTypes  } from 'sequelize';

// Interface para os atributos do modelo
export interface SearchHistoryAttributes {
  id: number;
  movies_id: number;
  title: string;
  query?: string | null;
  year: number;
  decade: number;
  genre?: string | null;
  type?: string | null;
  searchedAt: Date;
}

// Interface para os atributos de criação (torna campos opcionais)
type SearchHistoryCreationAttributes = Optional<SearchHistoryAttributes, 'id' | 'query' | 'genre' | 'type'>;

// A classe agora é exportada diretamente
export class SearchHistory
  extends Model<SearchHistoryAttributes, SearchHistoryCreationAttributes>
  implements SearchHistoryAttributes
{
  // Atributos da instância
  public id!: number;
  public movies_id!: number;
  public title!: string;
  public query!: string | null;
  public year!: number;
  public decade!: number;
  public genre!: string | null;
  public type!: string | null;

  // Timestamp customizado (gerenciado pelo Sequelize)
  public readonly searchedAt!: Date;

  // Método estático para definir as associações
  public static associate(models: any) {
    // Um Histórico de Busca pertence a um Filme
    SearchHistory.belongsTo(models.Movie, { foreignKey: 'movies_id' });
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
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        query: {
          type: DataTypes.STRING,
          allowNull: true,

        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        decade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        genre: {
          type: DataTypes.STRING,
          allowNull: true,

        },
        type: {
          type: DataTypes.STRING,
          allowNull: true,

        },
        // A coluna 'searchedAt' é definida aqui para garantir o 'allowNull: false',
        // mas será gerenciada pelo Sequelize através das opções abaixo.
        searchedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'SearchHistories',
        modelName: 'SearchHistory',
        timestamps: true,       // Ativa o gerenciamento de timestamps
        updatedAt: false,       // Desativa a coluna 'updatedAt'
        createdAt: 'searchedAt',  // Renomeia a coluna 'createdAt' para 'searchedAt'
      }
    );
  }
}

export default SearchHistory