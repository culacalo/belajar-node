const DBService = require('@common/services/db.common.service.js');

class AndrewModel{
  constructor(){
    this.table = 'andrew';
    this.dbService = new DBService();
  }

  async index(){
    const query = `select * from ${this.table} where is_deleted = 0`;
    return await this.dbService.query(query);
  }

  async getById(id){
    const query = 'select * from users where id=? and is_deleted = 0';
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

module.exports = AndrewModel;