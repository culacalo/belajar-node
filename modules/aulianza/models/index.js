const DBService = require('@common/services/db.common.service.js');

class AulianzaModel {
    constructor() {
        this.dbService = new DBService();
    }

    async index() {
        const query = `SELECT * FROM aulianza`;
        return await this.dbService.query(query);
    }

    async getById(id) {
        const query = `SELECT * FROM aulianza WHERE id = ?`;
        return await this.dbService.query(query, id);
    }
}

module.exports = AulianzaModel;