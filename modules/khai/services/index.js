const KhaiModel = require('@khai/models');

class KhaiService {
    constructor(){
        this.khaiModel =new KhaiModel();
    }

    async index(){
        return await this.khaiModel.index();
    }

    async getById(id){
        const data = await this.khaiModel.getById(id);

        if(data.length > 0){
            return data;
        }

        return "data kosong";
    }
}
module.exports = KhaiService;