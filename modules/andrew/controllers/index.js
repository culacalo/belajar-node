const AndrewService = require('@andrew/services');
class AndrewController {
	constructor() {
		this.andrewService = new AndrewService();
		this.index = this.index.bind(this);
		this.getById = this.getById.bind(this);
	}

	async index(req, res) {
		res.send({
			data: await this.andrewService.index()
		});
	}

	async getById(req,res){
		res.send({
			data: await this.andrewService.getById(req.params.id)
		})
	}
}

module.exports = AndrewController;