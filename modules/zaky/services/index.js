const ZakyModel = require('@zaky/models');

class ZakyService {
  constructor(){
    this.zakyModel = new ZakyModel();
  }

  async index(){
    return await this.zakyModel.index();
  }

  async getById(id){
    const data = await this.zakyModel.getById(id);

    if(data.length > 0){
      return data;
    }

    return "data kosong";
  }
}

module.exports = ZakyService;