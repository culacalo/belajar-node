const DBService = require('@common/services/db.common.service.js');

class FahmiModels{
    constructor(){
        this.dbService = new DBService();
    }

    async index(){
        const query = 'select * from fahmi';
        const data = await this.dbService.query(query);
        return data;
    }

    async getById(id){
        const query = "select * from fahmi where id=?"
        const data = await this.dbService.query(query, id);
        return data
    }
}

module.exports = FahmiModels;