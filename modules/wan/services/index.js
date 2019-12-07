const WanModel = require('@wan/models');
const Validator = require('fastest-validator');
const HTTPStatus = require('http-status-codes');

class WanService {
    constructor() {
        this.wanModel = new WanModel();
        this.validator = new Validator();
        this.schema = {
            name: {
                type: "string",
                min: 3
            },
            age: {
                type: "number",
                positive: true,
                integer: true,
            }
        };
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
            name: name,
            age: age
        };

        const isFormValid = this.validator.validate(userData, this.schema);
        if (isFormValid !== true) {
            return {
                status: HTTPStatus.BAD_REQUEST,
                error: {
                    error_code: 'FORM_VALIDATION',
                    message: isFormValid
                }
            }
        }

        const isDataValid = await this.isDataValid(userData);
        if (isDataValid !== true) {
            return {
                status: HTTPStatus.BAD_REQUEST,
                error: {
                    error_code: 'DATA_VALIDATION',
                    message: isDataValid
                }
            }
        }

        const response = await this.wanModel.create(userData);

        if (response.affectedRows === 0) {
            return {
                status: HTTPStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error'
                }
            };
        }

        return {
            status: HTTPStatus.OK,
            data: "Data saved successfully"
        };
    }

    async isDataValid(data) {
        const { name } = data;

        const totalUserWithSameName = await this.wanModel.getUserCountByName(name);
        if (totalUserWithSameName.length > 0) {
            return [
                {
                    type: "string",
                    field: "name",
                    message: "Name is already exist"
                }
            ]
        }

        return true;
    }

    async update(id, userData) {
        if (!id) {
            return {
                status: HTTPStatus.BAD_REQUEST,
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
        if (response.affectedRows !== 1) {
            return {
                status: HTTPStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error"
            }
        }

        return {
            status: HTTPStatus.OK,
            data: "Successfully updated data"
        };
    }

    async delete(id) {
        if (!id) {
            return {
                status: HTTPStatus.BAD_REQUEST,
                message: "ID required"
            };
        }

        const data = {
            is_deleted: 1
        };

        const response = await this.wanModel.update(id, data);
        if (response.affectedRows !== 1) {
            return {
                status: HTTPStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error"
            }
        }

        return {
            status: HTTPStatus.OK,
            data: "Successfully deleted data"
        };
    }
}

module.exports = WanService;