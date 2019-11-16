const AliModels = require('@ali/models')
class AliServices{
    constructor(){
        this.aliModels = new AliModels()
    }

    async index(){
        return await this.aliModels.index()
    }
    async getById(id){
        const data = await this.aliModels.getById(id)

        if(data.length > 0){
            return data
        }
        return 'Data tidak ditemukan'
    }
}

module.exports = AliServices