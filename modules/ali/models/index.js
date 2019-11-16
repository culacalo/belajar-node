const DBService = require('@common/services/db.common.service.js');
class AliModel{
    constructor(){
        this.dbService = new DBService();
    }

    async index(){
        const query = 'SELECT * FROM AliTable'
        return await this.dbService.query(query)
    }

    async getById(id){
        const query = `SELECT * FROM AliTable where id = ?`
        return await this.dbService.query(query,[id])
    }
}

module.exports = AliModel;