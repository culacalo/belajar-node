class AliController{
    constructor(){
        this.index = this.index.bind(this)
    }
    async index(req,res){
        res.send({
            message: "Ali index controller"
        })
    }
}

module.exports = AliController;