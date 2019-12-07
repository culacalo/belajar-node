const DBService = require('@common/services/db.common.service.js');
class AliModel{
    constructor(){
        this.dbService = new DBService();
        this.table = 'AliTable';
    }

    async index(offset= 0, limit=10, maxAge, minAge){
        let query = `SELECT * 
            FROM ${this.table} 
            WHERE is_deleted=0`;
        if(maxAge){
            query += ` AND age <=${maxAge}`;
        }
        if(minAge){
            query += ` AND age >=${minAge}`;
        }
        query += ` LIMIT ${offset},${limit}`

        return await this.dbService.query(query)
    }

    async getTotalUser(maxAge, minAge){
        let query = `SELECT count(id) as total_user 
            FROM ${this.table} 
            WHERE is_deleted=0`;
            
        if(maxAge){
            query += ` AND age <=${maxAge}`;
        }
        if(minAge){
            query += ` AND age >=${minAge}`;
        }

        const result = await this.dbService.query(query) 
        return result[0].total_user

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
        const query = `SELECT id FROM ${this.table} WHERE name = ?`
        return await this.dbService.query(query,name)
    }
}

module.exports = AliModel;