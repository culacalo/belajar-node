const AliServices = require('@ali/services')
class AliController{
    constructor(){
        this.aliServices = new AliServices();
        this.index = this.index.bind(this)
        this.getById = this.getById.bind(this)
    }
    async index(req,res){
        res.send({
            data: await this.aliServices.index()
        })
    }

    async getById(req,res){
        res.send({
            data: await this.aliServices.getById(req.params.id)
        })
    }
}

module.exports = AliController