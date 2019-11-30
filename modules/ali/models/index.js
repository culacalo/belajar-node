const DBService = require('@common/services/db.common.service.js');
class AliModel{
    constructor(){
        this.dbService = new DBService();
        this.table = 'AliTable';
    }

    async index(){
        const query = `SELECT * FROM ${this.table} WHERE is_deleted=0`
        return await this.dbService.query(query)
    }

    async getById(id){
        const query = `SELECT * FROM ${this.table} WHERE id = ?`
        return await this.dbService.query(query,[id])
    }

    async createUser(data){
        const query = `INSERT INTO ${this.table} SET ?`
        return await this.dbService.query(query,data)
    }

    async updateUser(id,data){
        const query = `UPDATE ${this.table} SET ? WHERE id = ?`
        return await this.dbService.query(query,[data,id])
    }

    async getUserByName(name){
        const query = `SELECT id FROM ${this.table} WHERE name=?`
        return await this.dbService.query(query,name)
    }
}

module.exports = AliModel;