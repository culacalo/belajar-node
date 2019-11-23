const AulianzaModel = require('@aulianza/models');

class AulianzaServices {
    constructor() { 
        this.aulianzaModel = new AulianzaModel();
    }

    async index() {
        const data = await this.aulianzaModel.index();
        return data;
    }

    async getById(id) {
        const data = await this.aulianzaModel.getById(id);

        if (data.length > 0) {
            return data;
        }

        return "Data tidak ditemukan";
    }
}

module.exports = AulianzaServices;