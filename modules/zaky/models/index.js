const DBService = require('@common/services/db.common.service.js');

class ZakyModel{
  constructor(){
    this.table = 'users';
    this.dbService = new DBService();
  }

  async index(offset = 0, limit = 10, minAge, maxAge, search, sort_by = 'id', order = 'DESC'){
    let query = `SELECT * 
      FROM ${this.table} 
      WHERE is_deleted=0`;
    if(minAge){
      query += ` AND age >= ${minAge}`;
    }

    if(maxAge){
      query += ` AND age <= ${maxAge}`;
    }

    if(search){
      query += ` AND name like '%${search}%'`;
    }

    query += ` ORDER BY ${sort_by} ${order}
      LIMIT ${offset}, ${limit}`;
    return await this.dbService.query(query);
  }

  async getTotalUser(minAge, maxAge, search){
    let query = `Select count(id) as total_user FROM ${this.table} where is_deleted=0`;

    if(minAge){
      query += ` AND age >= ${minAge}`;
    }

    if(maxAge){
      query += ` AND age <= ${maxAge}`;
    }

    if(search){
      query += ` AND name like '%${search}%'`;
    }

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