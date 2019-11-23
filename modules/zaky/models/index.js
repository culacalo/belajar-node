const DBService = require('@common/services/db.common.service.js');

class ZakyModel{
  constructor(){
    this.table = 'users';
    this.dbService = new DBService();
  }

  async index(){
    const query = `SELECT * FROM ${this.table} WHERE is_deleted=0`;
    return await this.dbService.query(query);
  }

  async getById(id){
    const query = `select * from ${this.table} where id=?`;
    return await this.dbService.query(query, id);
  }

  async insert(data){
    const query = `insert into ${this.table} set ?`;
    const result = await this.dbService.query(query, data);
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

module.exports = ZakyModel;