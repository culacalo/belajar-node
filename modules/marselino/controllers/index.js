class MarselinoController{
	constructor(){
		this.index = this.index.bind(this);
	}

	async index(req, res){
		res.send({
			marselino:"ganteng"
		});
	}
}
module.exports =MarselinoController;