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

  async insert(data){
    const user = {
      name: data.name,
      age: data.age
    }
    const userSave = await this.andrewModel.insert(user);

    if(userSave.affectedRows === 0){
      return {
        status: 500
      }
    }

    return {
      status:200,
      data:"data saved"
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
    if(userData.nama){
      data.name = userData.name;
    }

    if(userData.name){
      data.age = userData.name;
    }

    if(userData.age){
      data.age = userData.age
    }
    const updateUser = await this.andrewModel.update(usereId, data);
    if(updateUser.affectedRows !== 1) {
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }

    return {
      status: 200,
      data: 'data update'
    }
  }
  async delete(userId){
    if(!userId){
      return {
        status: 400,
        message: 'user id requred'
      }
    }
    const data = {
      is_deleted: 1
    }
    const deleteUser = await this.andrewModel.update(userId, data);
    console.log(deleteUser)
    if(deleteUser.affectedRows !== 1){
      return {
        status: 500,
        message: 'Internal Serrver Error'
      }
    }

    return {
      status: 200,
      data: 'data Updated'
    }
  }
}

module.exports = AndrewService;