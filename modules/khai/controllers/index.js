const KhaiService = require('@khai/services');

class KhaiController {
    constructor() {
        this.khaiService = new KhaiService();
        this.index =this.index.bind(this);
        this.getById = this.getById.bind(this);
    }

    async index(req, res) {
        res.send({
            data: await this.khaiService.index()
        });
    }

    async getById(req, res){
        res.send({
            data: await this.khaiService.getById(req.params.id)
        })
    }
}

module.exports = KhaiController;