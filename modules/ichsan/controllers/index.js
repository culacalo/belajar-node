const IchsanService = require("@ichsan/services");

class IchsanController {
  constructor() {
    this.index = this.index.bind(this);
    this.ichsanService = new IchsanService();
    this.getById = this.getById.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.ichsanService.index()
    });
  }

  async getById(req, res) {
    res.send({
      data: await this.ichsanService.getById(req.params.id)
    });
  }
}

module.exports = IchsanController;
