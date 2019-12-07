const DBService = require('@common/services/db.common.service.js');

class WanModel {
    constructor() {
        this.table = "culacalo_wan";
        this.dbService = new DBService();
    }

    async index(offset = 0, limit = 10, minAge, maxAge, searchQuery, sortBy = 'id', sequence = 'DESC') {
        let query = `SELECT * FROM ${this.table} WHERE is_deleted=0`;

        if (minAge) {
            query += ` AND age >= ${minAge}`;
        }

        if (maxAge) {
            query += ` AND age <= ${maxAge}`;
        }

        if (searchQuery) {
            query += ` AND name LIKE '%${searchQuery}%'`;
        }

        query += ` ORDER BY ${sortBy} ${sequence} LIMIT ${offset}, ${limit}`;

        return await this.dbService.query(query);
    }

    async getTotalUser(minAge, maxAge, searchQuery) {
        let query = `SELECT COUNT(id) AS total_user FROM ${this.table} WHERE is_deleted = 0`;

        if (minAge) {
            query += ` AND age >= ${minAge}`;
        }

        if (maxAge) {
            query += ` AND age <= ${maxAge}`;
        }

        if (searchQuery) {
            query += ` AND name LIKE '%${searchQuery}%'`;
        }

        const result = await this.dbService.query(query);

        return result[0].total_user;
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

    async getUserCountByName(name) {
        const query = `SELECT id FROM ${this.table} WHERE name=?`;
        return await this.dbService.query(query, name);
    }
}

module.exports = WanModel;
