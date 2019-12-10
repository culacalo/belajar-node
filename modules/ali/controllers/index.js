const AliServices = require('@ali/services')
class AliController{
    constructor(){
        this.aliServices = new AliServices();
        this.index = this.index.bind(this)
        this.getById = this.getById.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }
    async index(req,res){
        const result = await this.aliServices.index(req.query);
        res.send(result);
    }

    async getById(req,res){
        res.send({
            data: await this.aliServices.getById(req.params.id)
        })
    }

    async createUser(req,res){
        const userData = req.body
        const insert = await this.aliServices.createUser(userData)
        res.status(insert.status)

        
        if(insert.status!==200){
            res.send({
                data: insert.error
            })
        }else{
            res.send({
                data: insert
            })
        }
    }

    async updateUser(req,res){
        const userId = req.params.id
        const userData = req.body
        const update = await this.aliServices.updateUser(userId,userData)

        res.status(update.status)
        if(update.status===200){
            res.send({
                message: update.message
            })
        }

        res.send({
            message: update.message
        })
    }

    async deleteUser(req,res){
        const userId = req.params.id
        const softDelete = await this.aliServices.deleteUser(userId)

        res.status(softDelete.status)
        if(softDelete.status===200){
            res.send({
                message: softDelete.message
            })
        }

        res.send({
            message: softDelete.message
        })
    }
}

module.exports = AliController