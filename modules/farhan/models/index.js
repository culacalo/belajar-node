const DBService = require('@common/services/db.common.service.js')

class FarhanModel{
    constructor(){
        this.dbService = new DBService()

    }

    async index(){
        const query = `select * from farhan`;
        return await this.dbService.query(query)
    }

    async getByID(id){
        const query = `select * from farhan where id=?`
        return await this.dbService.query(query, id)
    }
}

module.exports = FarhanModel