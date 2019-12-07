const DBService = require('@common/services/db.common.service.js');

class FahmiModels{
    constructor(){
        this.table = 'fahmi';
        this.dbService = new DBService();
    }

    async index(offset=0, limit=10){
        const query = `select * from fahmi where is_deleted=0 limit ${offset}, ${limit}`;
        const data = await this.dbService.query(query);
        return data;
    }

    async getById(id){
        const query = "select * from fahmi where id=? and is_deleted=0"
        const data = await this.dbService.query(query, id);
        return data
    }

    async insert(data){
        const query = `insert into ${this.table} set ?`;
        const result = await this.dbService.query(query, data);
        return result;
    }

    async update(userId, userData){
        const query = `UPDATE ${this.table} SET ? WHERE id=?`
        const result = await this.dbService.query(query, [userData, userId]);
        return result;
    }

    async getUserByName(name){
        const query = `SELECT id FROM ${this.table} WHERE name=?`;
        const result = await this.dbService.query(query, name);
        return result;
    }

    async getTotalUser(minAge, maxAge){
        const query = `SELECT count(id) as total_user from ${this.table} where is_deleted=0`;
        const result = await this.dbService.query(query);
        return result[0].total_user;
    }
}

module.exports = FahmiModels;