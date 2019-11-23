const DBService = require('@common/services/db.common.service.js');

class AulianzaModel {
    constructor(){
        this.table = 'aulianza';
        this.dbService = new DBService();
    }

    // index function 
    async index(){
        // intial query from database 
        const query = `SELECT * FROM ${this.table}`;
        // return query 
        return await this.dbService.query(query);
    }

    async getById(id){
        const query = `SELECT * FROM ${this.table} WHERE id = ?`;
        return await this.dbService.query(query, id);
    }

    async insert(data){
        const query = `INSERT INTO ${this.table} SET ?`;
        const result = await this.dbService.query(query, data);
        return result;
    }

    async update(userId, data){
        const query = `UPDATE ${this.table} SET ? WHERE id = ?`
        const result = await this.dbService.query(query, [
            data,
            userId
        ])
        return result;
    }

    async delete(userId, data){
        const query = `UPDATE ${this.table} SET ? WHERE id = ?`
        const result = await this.dbService.query(query, [
            data,
            userId
        ])
        return result;
    }

}

module.exports = AulianzaModel;