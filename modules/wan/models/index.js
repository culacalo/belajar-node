const DBService = require('@common/services/db.common.service.js');

class WanModel {
    constructor() {
        this.table = "culacalo_wan";
        this.dbService = new DBService();
    }

    async index() {
        const query = `SELECT * FROM culacalo_wan WHERE is_deleted=0`;
        return await this.dbService.query(query);
    }

    async getUserByID(id) {
        const query = `SELECT * FROM culacalo_wan WHERE id=?`;
        return await this.dbService.query(query, id);
    }

    async create(data) {
        const query = `INSERT INTO ${this.table} SET ?`;
        return await this.dbService.query(query, data);
    }

    async update(userID, data) {
        const query = `UPDATE ${this.table} SET ? WHERE id=?`;
        return await this.dbService.query(query, [data, userID]);
    }
}

module.exports = WanModel;
