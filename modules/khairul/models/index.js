const DBService = require('@common/services/db.common.service.js');

class KhairulyModel{
  constructor(){
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
}

module.exports = KhairulyModel;