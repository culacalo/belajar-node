const DBService = require('@common/services/db.common.service.js');

class KhairulModel{
  constructor(){
    this.table = 'khairul';
    this.dbService = new DBService();
  }

  async index({ offset, limit, minAge, maxAge, search, sortBy, order }){
    let query = `SELECT * FROM ${this.table} WHERE is_deleted=0`;

    if (minAge) {
      query += ` AND age >= ${minAge}`;
    }

    if (maxAge) {
      query += ` AND age <= ${maxAge}`
    }

    if (search) {
      query += ` AND name like '%${search}%'`;
    }

    if (sortBy) {
      query += ` ORDER BY ${sortBy} ${order}`;
    }
    
    query += ` LIMIT ${offset}, ${limit}`;
    return await this.dbService.query(query);
  }

  async getTotalData({ minAge, maxAge, search }) {
    let query = `SELECT count(id) as total FROM ${this.table} WHERE is_deleted=0`;

    if (minAge) {
      query += ` AND age >= ${minAge}`;
    }

    if (maxAge) {
      query += ` AND age <= ${maxAge}`;
    }

    if (search) {
      query += ` AND name like '%${search}%'`;
    }

    const result = await this.dbService.query(query);
    return result[0].total;
  }

  async getById(id){
    const query = `SELECT * FROM ${this.table} WHERE id=?`;
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

  async getUserByName(name) {
    const query = `SELECT id FROM ${this.table} WHERE name=?`;
    const result = await this.dbService.query(query, name);
    return result;
  }
}

module.exports = KhairulModel;