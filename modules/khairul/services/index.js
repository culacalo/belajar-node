const KhairulModel = require('@khairul/models');

class KhairulService {
  constructor(){
    this.khairulModel = new KhairulModel();
  }

  async index(){
    return await this.khairulModel.index();
  }

  async getById(id){
    const data = await this.khairulModel.getById(id);

    if(data.length > 0){
      return data;
    }

    return "data kosong";
  }
}

module.exports = KhairulService;