const DBService = require('@common/services/db.common.service.js');

class KhaiModel{
    constructor(){
        this.dbService = new DBService();
        this.table = 'datadir'
    }

    async index(){
        const query ='select * from datadir WHERE is_deleted=0';
        return await this.dbService.query(query);
    }

    async getById(id){
        const query ='select * from datadir where id=?';
        return await this.dbService.query(query, id);
    }

    async insert(data){

        const query = `insert into ${this.table} set ?`;
        const result = await this.dbService.query(query,data);
        return result;
    }

    async update(userId, data){
        const query =`UPDATE ${this.table}
        SET ?
        WHERE id=?`
        const result = await this.dbService.query(query, [data, userId]);
        return result;
    }


}
module.exports = KhaiModel;