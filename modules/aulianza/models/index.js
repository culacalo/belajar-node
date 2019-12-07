const DBService = require("@common/services/db.common.service.js");

class AulianzaModel {
  constructor() {
    this.table = "aulianza";
    this.dbService = new DBService();
  }

  async index(offset = 0, limit = 10) {
    let query = `SELECT * 
      FROM ${this.table} 
      WHERE is_deleted = 0
      LIMIT ${offset}, ${limit}`;

    return await this.dbService.query(query);
  }

  async getTotalUser() {
    let query = `SELECT COUNT(id) AS total_user FROM ${this.table} WHERE is_deleted=0`;

    const result = await this.dbService.query(query);
    return result[0].total_user;
  }

  async getById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id = ?`;
    return await this.dbService.query(query, id);
  }

  async insert(data) {
    const query = `INSERT INTO ${this.table} SET ?`;
    const result = await this.dbService.query(query, data);
    return result;
  }

  async update(userId, data) {
    const query = `UPDATE ${this.table} SET ? WHERE id = ?`;
    const result = await this.dbService.query(query, [data, userId]);
    return result;
  }

  async delete(userId, data) {
    const query = `UPDATE ${this.table} SET ? WHERE id = ?`;
    const result = await this.dbService.query(query, [data, userId]);
    return result;
  }

  async getUserByName(name) {
    const query = `SELECT id FROM ${this.table} WHERE name=?`;
    const result = await this.dbService.query(query, name);
    return result;
  }
}

module.exports = AulianzaModel;
