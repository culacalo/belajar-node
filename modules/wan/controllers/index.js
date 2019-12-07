const WanService = require('@wan/services');
const HTTPStatus = require('http-status-codes');

class WanController {
    constructor() {
        this.wanService = new WanService();
        this.index = this.index.bind(this);
        this.getUserByID = this.getUserByID.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req, res) {
        res.json({
            data: await this.wanService.index()
        });
    }

    async getUserByID(req, res) {
        res.json({
            data: await this.wanService.getUserByID(req.params.id)
        })
    }

    async create(req, res) {
        const response = await this.wanService.create(req.body);

        res.status(response.status);

        if (response.status !== HTTPStatus.OK) {
            res.send({
                error: response.error
            });
        }

        res.send({
            data: response
        });
    }

    async update(req, res) {
        const id = req.params.id;
        const userData = req.body;

        const response = await this.wanService.update(id, userData);

        res.status(response.status);

        if (response.status === HTTPStatus.OK) {
            res.send({
                data: response.data
            });
        }

        res.send({
            message: response.message
        });
    }

    async delete(req, res) {
        const id = req.params;

        const response = await this.wanService.delete(id);

        res.status(response.status);

        if (response.status === HTTPStatus.OK) {
            res.send({
                data: response.data
            });
        }

        res.send({
            message: response.message
        });
    }
}

module.exports = WanController;