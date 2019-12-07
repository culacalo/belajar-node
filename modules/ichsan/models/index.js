const dbService = require('@common/services/db.common.service.js');

class IchsanModel {
  constructor() {
    this.table = 'ichsan';
    this.db = new dbService();
  }

  async index(
    offSet = 0,
    limit = 10,
    minAge,
    maxAge,
    search,
    sortBy = 'id',
    order = 'DESC'
  ) {
    let query = `SELECT * FROM ${this.table} WHERE is_deleted = 0`;

    if (minAge) {
      query += ` AND age >= ${minAge}`;
    }
    if (maxAge) {
      query += ` AND age <= ${maxAge}`;
    }

    if (search) {
      query += ` AND name LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}
               LIMIT ${offSet}, ${limit}`;

    return await this.db.query(query);
  }

  async getTotalUser(minAge, maxAge, search) {
    let query = `SELECT COUNT(id) AS total_user FROM ${this.table} WHERE is_deleted=0`;

    if (minAge) {
      query += ` AND age >= ${minAge}`;
    }

    if (maxAge) {
      query += ` AND age <= ${maxAge}`;
    }

    if (search) {
      query += ` AND name LIKE '%${search}%'`;
    }

    const result = await this.db.query(query);
    return result[0].total_user;
  }

  async getById(id) {
    const sql = `SELECT * FROM ichsan WHERE id= ?`;

    return await this.db.query(sql, id);
  }

  // model function to insert data
  async insert(data) {
    const sql = `INSERT INTO ${this.table} SET ?`;
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

  async getUserByName(name) {
    const query = `SELECT id FROM ${this.table} WHERE name=?`;

    return await this.db.query(query, name);
  }
}

module.exports = IchsanModel;
