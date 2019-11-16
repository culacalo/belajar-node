const FarhanModel = require('@farhan/models')

class FarhanService{
    constructor(){
        this.farhanModel = new FarhanModel()
    }

    async index(){
        return await this.farhanModel.index()
    }

    async getByID(id){
        const data = await this.farhanModel.getByID(id)

        if(data.length > 0){
            return data
        }else{
            return "data kosong"
        }
    }
}

module.exports = FarhanService;