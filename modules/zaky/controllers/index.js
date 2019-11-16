const ZakyService = require('@zaky/services');

class ZakyController {
  constructor() {
    this.zakyService = new ZakyService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.zakyService.index()
    });
  }

  async getById(req, res){
    res.send({
      data: await this.zakyService.getById(req.params.id)
    })
  }
}

module.exports = ZakyController;
