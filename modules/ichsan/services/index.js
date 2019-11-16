const IchsanModel = require("@ichsan/models");

class IchsanService {
  constructor() {
    this.ichsanModel = new this.IchsanModel();
  }

  async index() {
    return await this.IchsanModel.index();
  }

  async getById(id) {
    const data = await this.ichsanModel.getById(id);

    if (data.length < 1) {
      return "data kosong";
    }
    return data;
  }
}

module.exports = IchsanService;
