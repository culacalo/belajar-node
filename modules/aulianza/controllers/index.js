const AulianzaService = require('@aulianza/services');

class AulianzaController {
    constructor() {
        this.aulianzaService = new AulianzaService();
        this.index = this.index.bind(this);
        this.getById = this.getById.bind(this);
    }

    async index(req, res) {
        res.send({
            data: await this.aulianzaService.index()
        })
    }

    async getById(req, res) {
        res.send({
            data: await this.aulianzaService.getById(req.params.id)
        })
    }

}
module.exports = AulianzaController;