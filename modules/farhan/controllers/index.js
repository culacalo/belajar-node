const FarhanService = require('@farhan/services')

class FarhanController{
    constructor(){
        this.farhanService = new FarhanService();
        this.index = this.index.bind(this)
        this.getByID = this.getByID.bind(this)
    }

    async index(req, res){
        res.send({
            data: await this.farhanService.index()
        });
        // res.send({
        //     data: "apam"
        // })
    }

    async getByID(req, res){
        res.send({
            data: await this.farhanService.getByID(req.params.id)
        });
    }
}

module.exports = FarhanController;