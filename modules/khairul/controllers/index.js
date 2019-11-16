const KhairulService = require('@khairul/services');
class KhairulController {
  constructor(){
    this.khairulService = new KhairulService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.khairulService.index()
    });
  }

  async getById(req, res) {
    res.send({
      data: await this.khairulService.getById(req.params.id)
    })
  }
}

module.exports = KhairulController
