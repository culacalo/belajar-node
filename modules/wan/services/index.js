const WanModel = require('@wan/models');

class WanService {
    constructor() {
        this.wanModel = new WanModel();
    }

    async index() {
        return await this.wanModel.index();
    }

    async getUserByID(id) {
        const data = await this.wanModel.getUserByID(id);

        if (data.length > 0) {
            return data;
        }

        return "Empty data";
    }

    async create(data) {
        const { name, age } = data;
        const userData = {
            name,
            age
        };

        const response = this.wanModel.create(userData);

        if (response.affectedRows === 0) {
            return {
                status: 500
            };
        }

        return {
            status: 200,
            data: "Data saved successfully"
        };
    }

    async update(id, userData) {
        if (!id) {
            return {
                status: 400,
                message: "ID required"
            };
        }

        const data = {};
        const { name, age } = userData;

        if (name) {
            data.name = name;
        }

        if (age) {
            data.age = age;
        }

        const response = await this.wanModel.update(id, data);
        console.log(response)
        if (response.affectedRows !== 1) {
            return {
                status: 500,
                message: "Internal Server Error"
            }
        }

        return {
            status: 200,
            data: "Successfully updated data"
        };
    }

    async delete(id) {
        if (!id) {
            return {
                status: 400,
                message: "ID required"
            };
        }

        const data = {
            is_deleted: 1
        };

        const response = await this.wanModel.update(id, data);
        if (response.affectedRows !== 1) {
            return {
                status: 500,
                message: "Internal Server Error"
            }
        }

        return {
            status: 200,
            data: "Successfully deleted data"
        };
    }
}

module.exports = WanService;