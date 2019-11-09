class AndrewController{
	constructor(){
		this.index = this.index.bind(this);
	}

	async index(req, res){
		res.send({
			andrew:"jelek"
		});
	}
}
module.exports = AndrewController;