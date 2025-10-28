class CrudService {
  constructor(model) {
    this.model = model
  }

  async findAll(options) {
      return this.model.findAll(options)
  }

  async findOne(options) {
    return this.model.findOne(options)
  }

  async findById(id) {
    return this.model.findByPk(id)
  }

  async create(data) {
    return this.model.create(data)
  }

  async update(id, data, options){
    return this.model.update(data, { where: { id }, ...options });
  }

  async delete(id, options) {
    return this.model.destroy({ where: { id }, ...options });
  }

  async deleteAll(options) {
    return this.model.destroy({ ...options });
  }

}
module.exports = CrudService