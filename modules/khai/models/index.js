const DBService = require('@common/services/db.common.service.js');

class KhaiModel{
    constructor(){
        this.dbService = new DBService();
    }

    async index(){
        const query ='select * from datadir';
        return await this.dbService.query(query);
    }

    async getById(id){
        const query ='select * from datadir where id=?';
        return await this.dbService.query(query, id);
    }

}
module.exports = KhaiModel;