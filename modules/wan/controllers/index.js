const WanService = require('@wan/services');

class WanController {
    constructor() {
        this.wanService = new WanService();
        this.index = this.index.bind(this);
        this.getUserByID = this.getUserByID.bind(this);
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
}

module.exports = WanController;