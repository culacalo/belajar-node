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

  async insert(data){
    const user = {
      name: data.name,
      age: data.age
    }

    const userSave = await this.zakyModel.insert(user);

    if(userSave.affectedRows === 0){
      return {
        status: 500
      }
    }

    return {
      status: 200,
      data: "data saved"
    }
  }

  async update(userId, userData){
    if(!userId){
      return {
        status: 400,
        message: 'user id required'
      }
    }

    const data = {};
    if(userData.name){
      data.name = userData.name;
    }

    if(userData.age){
      data.age = userData.age
    }

    const updateUser = await this.zakyModel.update(userId, data);
    if(updateUser.affectedRows !== 1){
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }

    return {
      status: 200,
      data: 'data updated'
    }
  }

  async delete(userId){
    if(!userId){
      return {
        status: 400,
        message: 'user id required'
      }
    }

    const data = {
      is_deleted: 1
    }

    const deleteUser = await this.zakyModel.update(userId, data);
    if(deleteUser.affectedRows !== 1){
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }

    return {
      status: 200,
      data: 'data updated'
    }
  }
}

module.exports = ZakyService;