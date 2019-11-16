const DBService = require('@common/services/db.common.service.js');

class WanModel {
    constructor() {
        this.dbService = new DBService();
    }

    async index() {
        const query = `SELECT * FROM culacalo_wan`;
        return await this.dbService.query(query);
    }

    async getUserByID(id) {
        const query = `SELECT * FROM culacalo_wan WHERE id=?`;
        return await this.dbService.query(query, id);
    }
}

module.exports = WanModel;
