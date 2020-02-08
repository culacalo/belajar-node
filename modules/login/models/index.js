const DBService = require('@common/services/db.common.service.js');

class LoginModel {
  constructor() {
    this.dbService = new DBService();
    this.table = 'users';
  }

  async isValidUser(email, password){
    const query = `SELECT * FROM ${this.table}
        WHERE email = ?
          AND password = ?`;
    
    const result = await this.dbService.query(query, [email, password]);
    return result;
  }
}

module.exports = LoginModel;