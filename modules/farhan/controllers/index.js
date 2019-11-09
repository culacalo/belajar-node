class FarhanController{
    constructor(){
        this.index = this.index.bind(this)
    }

    async index(req, res){
        res.send({
            farhan: "sangat ganteng"
        });
    }
}

module.exports = FarhanController;