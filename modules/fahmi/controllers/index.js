const FahmiServices = require('@fahmi/services');

class FahmiController {
  constructor() {
    this.fahmiServices = new FahmiServices();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this)
  }

  async index(req, res) {
    res.send({
      data: await this.fahmiServices.index()
    });
  }

  async getById(req, res){
    res.send({
      data: await this.fahmiServices.getById(req.params.id)
    })
  }
}

module.exports = new FahmiController();
