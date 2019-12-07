const KhaiModel = require('@khai/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');

class KhaiService {
    constructor(){
        this.khaiModel =new KhaiModel();
        this.validator=new Validate();
        this.schema = {
            name: {
                type: 'string',
                min: 3,
            },
            age: {
                type: 'number',
                positive: true,
                integer: true,
                optional: true
            }
        }
    }

    async index(query){
        const offset = query.offset || 0;
        const limit = query.limit || 10;
        const maxAge = query.max_age;
        const minAge = query.min_age;
        const search = query.q;
        const sortBy = query.sort_by;
        const order = query.order;

       
        const totalUser = await this.khaiModel.getTotalUser(minAge, maxAge, search);
        const userData = await this.khaiModel.index(
           offset,
           limit,
           minAge,
           maxAge,
           search,
           sortBy,
           order
       );

       return {
           data: userData,
           pagination: {
               total_item: totalUser,
               offset,
               limit
           }
       }
    }

    async getById(id){
        const data = await this.khaiModel.getById(id);

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
        return {
            status: HttpStatus.BAD_REQUEST,
            error: {
                error_code: 'FORM_VALIDATION',
                message: isFormValid
            }
        }
    }

    const isDataValid = await this.dataValidation(user);
    if(isDataValid !== true){
        return {
            status: HttpStatus.BAD_REQUEST,
            error: {
                error_code: 'DATA_VALIDATION',
                message: isDataValid
            }
        }
    }

    const userSave = await this.khaiModel.insert(user)
        if(userSave.affectedRows === 0){
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Server Error Bro'
                }
            }
        }

        return {
            status: HttpStatus.OK,
            data: "data saved"
        }
    }

    async dataValidation(data){
        const { name } = data

        const userWithName = await this.khaiModel.getUserByName(name);
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
        if(userData.name){
            data.name = userData.name;
        }

        if(userData.age){
            data.age = userData.age
        }

        const updateUser = await this.khaiModel.update(userId, data);     
        if(updateUser.affectedRows !== 1){
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
            message: 'user id required'
        }
    }

    const data = {
        is_deleted: 1
    }

    const deleteUser = await this.khaiModel.update(userId, data);
    if(deleteUser.affectedRows !==1){
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }

    return {
        status: 200,
        data:'data updated'
    }
}
}

module.exports = KhaiService;