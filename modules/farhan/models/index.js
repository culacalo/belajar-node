const DBService = require('@common/services/db.common.service.js')

class FarhanModel{
  constructor(){
    this.table = 'farhan'
    this.dbService = new DBService()
  }

  async index(){
    const query = `SELECT * FROM ${this.table} WHERE is_deleted=0`;
    return await this.dbService.query(query)
  }

  async getByID(id){
    const query = `SELECT * FROM ${this.table} WHERE id=?`
    return await this.dbService.query(query, id)
  }

  async getUserByName(name){
    const query = `SELECT id FROM ${this.table} WHERE name=?`
    const result = await this.dbService.query(query, name)
    return result
  }

  async insert(data){
    const query = `INSERT INTO ${this.table} set ?`;
    const result = await this.dbService.query(query, data)
    return result;
  }

  async update(userId, data){
    const query = `UPDATE ${this.table}
      SET ?
      WHERE id=?`
    const result = await this.dbService.query(query, [data, userId]);
    return result;
  }
}

module.exports = FarhanModel