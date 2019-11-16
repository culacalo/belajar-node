const dbService = require("@common/services/db.common.service.js");

class IchsanModel {
  constructor() {
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
}

module.exports = IchsanModel;
