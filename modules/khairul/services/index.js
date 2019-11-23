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

  async insert(data) {
    const user = {
      name: data.name,
      age: data.age
    }

    const userSave = await this.khairulModel.insert(user);

    if (userSave.affectedRows === 0) {
      return {
        status: 500
      }
    }

    return {
      status: 200,
      data: "Data Saved"
    }
    
  }

  async update(userId, userData) {
    if (!userId) {
      return {
        status: 400,
        message: 'user id required'
      }
    }

    const data = {};
    if(userData.name) {
      data.name = userData.name;
    }

    if (userData.age) {
      data.age = userData.age;
    }

    const { affectedRows } = await this.khairulModel.update(userId, data);
    if (affectedRows !== 1) {
      return {
        status: 500,
        message: "Internal Server Error"
      }
    }

    return {
      status: 200,
      data: 'Data Updated'
    }
  }

  async delete(userId) {
    if (!userId) {
      return {
        status: 400,
        message: 'User Id is Required'
      }
    }

    const data = {
      is_deleted: 1
    }

    const { affectedRows } = await this.khairulModel.update(userId, data);
    if (affectedRows !== 1) {
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }

    return {
      status: 200,
      data: 'Data Updated'
    }
  }
}

module.exports = KhairulService;