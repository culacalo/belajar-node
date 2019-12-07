const DBService = require('@common/services/db.common.service.js');

class ZakyModel{
  constructor(){
    this.table = 'users';
    this.dbService = new DBService();
  }

  async index(offset, limit){
    const query = `SELECT * FROM ${this.table} WHERE is_deleted=0 LIMIT ${offset}, ${limit}`;
    return await this.dbService.query(query);
  }

  async getTotalUser(){
    const query = `Select count(id) as total_user FROM ${this.table} where is_deleted=0`;
    const result = await this.dbService.query(query);
    return result[0].total_user;
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

  async getUserByName(name){
    const query = `SELECT id FROM ${this.table} WHERE name=?`;
    const result = await this.dbService.query(query, name);
    return result;
  }
}

module.exports = ZakyModel;