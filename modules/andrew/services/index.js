const AndrewModel = require('@andrew/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');

class AndrewService {
  constructor(){
    this.andrewModel = new AndrewModel();
    this.validator = new Validate();
    this.schema = {
      name: {
        type: 'string',
        min: 3,
      },
      age : {
        type: 'number',
        positive: true,
        integer: true,
        optional: true
      }
    }
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
    const isFormValid = this.validator.validate(user, this.schema);
    if(isFormValid !== true){
      return{
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'FORM_VALIDATION',
          message: isFormValid
        }
      }
    }

    const isDataValid = await this.dataValidation(user);
    if(isDataValid !== true){
      return{
        status: HttpStatus.BAD_REQUEST,
        error:{
          error_code: 'DATA_VALIDATION',
          message: isDataValid
        }
      }
    }

    const userSave = await this.andrewModel.insert(user);

    if(userSave.affectedRows === 0){
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          error_code: 'INTERNAL_SERVER_ERROR',
          message: 'Servern Error Bro'

        }
      }
    }

    return {
      status:HttpStatus.OK,
      data:"data saved"
    }
  }

async dataValidation(data){
  const {name} = data

  const userWithName = await this.andrewModel.getUserByName(name);
  if(userWithName.length > 0){
    return [
      {
        type: "string",
        field: "name",
        message: "the name already exist"
      }
    ]
  }

  return true;
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