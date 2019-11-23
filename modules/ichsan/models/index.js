const dbService = require("@common/services/db.common.service.js");

class IchsanModel {
  constructor() {
    this.table = "ichsan";
    this.db = new dbService();
  }

  async index() {
    const sql = `select * from ichsan`;
    return await this.db.query(sql);
  }

  async getById(id) {
    const sql = `select * from ichsan where id= ?`;

    return await this.db.query(sql, id);
  }

  // model function to insert data
  async insert(data) {
    const sql = `INSERT into ${this.table} SET ?`;
    const result = await this.db.query(sql, data);
    return result;
  }

  async update(userId, data) {
    const sql = `UPDATE ${this.table} 
    SET ?
    WHERE id=?`;

    const result = await this.db.query(sql, [data, userId]);

    return result;
  }
}

module.exports = IchsanModel;
