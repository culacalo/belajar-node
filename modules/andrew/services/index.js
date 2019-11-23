const AndrewModel = require('@andrew/models');

class AndrewService {
  constructor(){
    this.andrewModel = new AndrewModel();
  }

  async index(){
    return await this.andrewModel.index();
  }

  async getById(id){
    const data = await this.andrewModel.getById(id);

    if(data.length > 0){
      return data;
    }

    return "data kosong";
  }
}

module.exports = AndrewService;