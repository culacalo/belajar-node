const FahmiModels = require('@fahmi/models');

class FahmiServices{
    constructor(){
        this.fahmiModels = new FahmiModels();
    }

    async index(){
        const data = await this.fahmiModels.index();
        return data;
    }

    async getById(id){
        const data = await this.fahmiModels.getById(id);

        if (data.length > 0) {
            return data;
        }
        return "Data Tidak Ada"
    }
}

module.exports = FahmiServices;