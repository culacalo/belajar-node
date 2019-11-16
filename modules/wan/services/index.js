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
}

module.exports = WanService;