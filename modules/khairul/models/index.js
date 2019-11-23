const DBService = require('@common/services/db.common.service.js');

class KhairulModel{
  constructor(){
    this.table = 'khairul';
    this.dbService = new DBService();
  }

  async index(){
    const query = `select * from khairul`;
    return await this.dbService.query(query);
  }

  async getById(id){
    const query = `select * from khairul where id=?`;
    return await this.dbService.query(query, id);
  }

  async insert(data) {
    const query = `INSERT INTO ${this.table} SET ?`;
    const result = await this.dbService.query(query, data);
    return result;
  }

  async update(userId, data) {
    const query = `UPDATE ${this.table}
    SET ?
    WHERE id=?`

    const result = await this.dbService.query(query, [data, userId]);
    return result;
  }
}

module.exports = KhairulModel;