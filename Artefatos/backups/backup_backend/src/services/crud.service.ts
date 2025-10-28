import type { Model, ModelCtor, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize';
import type { MakeNullishOptional } from 'sequelize/lib/utils';

class CrudService<T extends Model> {
  protected model: ModelCtor<T>;
  constructor(model: ModelCtor<T>) {
    this.model = model
  }

  async findAll(options?: FindOptions): Promise<T[] | null> {
      return this.model.findAll(options)
  }

  async findOne(options?: FindOptions): Promise<T | null> {
    return this.model.findOne(options)
  }

  async findById(id: number | string): Promise<T | null> {
    return this.model.findByPk(id)
  }

  async create(data: MakeNullishOptional<T["_creationAttributes"]>, options?: CreateOptions) {
    return this.model.create(data, options)
  }

  async update(id: number | string, data: Partial<T['_creationAttributes']>, options?: UpdateOptions): Promise<[affectedCount: number]> {
    return this.model.update(data, { where: { id }, ...options });
  }

  async delete(id: number | string, options?: DestroyOptions): Promise<number> {
    return this.model.destroy({ where: { id }, ...options });
  }

  async deleteAll(options?: DestroyOptions): Promise<number> {
    return this.model.destroy({ ...options });
  }


}

export default CrudService