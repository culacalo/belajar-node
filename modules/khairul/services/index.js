const KhairulModel = require('@khairul/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');
class KhairulService {
  constructor(){
    this.khairulModel = new KhairulModel();
    this.validator = new Validate();
    this.schema = {
      name: {
        type: 'string',
        min: 3,
      },
      age: {
        type: 'number',
        positive: true,
        integer: true,
        optional: true,
      }
    }
  }

  async index(query){
    const params = {
      offset: query.offset || 0,
      limit: query.limit || 10,
      minAge: query.min_age,
      maxAge: query.max_age,
      search: query.q,
      sortBy: query.sort_by || 'id',
      order: query.order || 'DESC',
    }

    const total = await this.khairulModel.getTotalData(params);
    const data = await this.khairulModel.index(params);

    return {
      data,
      pagination: {
        total,
        offset: params.offset,
        limit: params.limit,
      }
    }
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

    const isFormValid = this.validator.validate(user, this.schema);
    if (isFormValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'FORM_VALIDATION',
          message: isFormValid
        }
      }
    } 

    const isDataValid = await this.dataValidation(user);
    if (isDataValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'DATA_VALIDATION',
          message: isDataValid
        }
      }
    }

    const userSave = await this.khairulModel.insert(user);

    if (userSave.affectedRows === 0) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          error_code: 'INTERNAL_SERVER_ERROR',
          message: 'Server Error'
        }
      }
    }

    return {
      status: HttpStatus.OK,
      data: "Data Saved"
    }
    
  }

  async dataValidation(data) {
    const { name } = data;

    const userWithName = await this.khairulModel.getUserByName(name);
    console.log('userWithName', userWithName)
    if(userWithName.length > 0) {
      return [
        {
          type: 'string',
          field: 'name',
          message: 'name is already exist'
        }
      ]
    }

    return true;
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