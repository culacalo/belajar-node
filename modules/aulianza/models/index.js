const DBService = require("@common/services/db.common.service.js");

class AulianzaModel {
  constructor() {
    this.table = "aulianza";
    this.dbService = new DBService();
  }

  async index(offset = 0, limit = 10, minAge, maxAge) {
    let query = `SELECT * 
      FROM ${this.table} 
      WHERE is_deleted = 0`;

    if (minAge) {
      query += ` AND age >= ${minAge}`;
    }

    if (maxAge) {
      query += ` AND age <= ${maxAge}`;
    }

    query += ` LIMIT ${offset}, ${limit}`;
    console.log(query);
    return await this.dbService.query(query);
  }

  async getTotalUser(minAge, maxAge) {
    let query = `SELECT COUNT(id) AS total_user FROM ${this.table} WHERE is_deleted=0`;

    if (minAge) {
      query += ` AND age >= ${minAge}`;
    }

    if (maxAge) {
      query += ` AND age <= ${maxAge}`;
    }

    console.log("getTotalUser : " + query);
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
