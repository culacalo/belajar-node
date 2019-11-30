const FahmiModels = require('@fahmi/models');
const Validator = require('fastest-validator');
const HttpStatus = require('http-status-codes'); 

class FahmiServices{
    constructor(){
        this.fahmiModels = new FahmiModels();
        this.v = new Validator();
        this.schema = {
            name:{
                type:'string',
                min:3
            },
            age:{
                type: 'number',
                positive: true,
                integer: true,
                optional: true
            }
        }
    }

    async index(){
        const data = await this.fahmiModels.index();
        return data;
    }

    async getById(id){
        const data = await this.fahmiModels.getById(id);

        if (data.length > 0) {
            return data;
        }
        return "Data Tidak Ada"
    }

    async insert(data){
        const user = {
            name: data.name,
            age: data.age
        }
        
        const isFormValid = this.v.validate(user, this.schema)
        if (isFormValid !== true) {
           return {
               status: HttpStatus.BAD_REQUEST,
               error:{
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
        
        const userSave = await this.fahmiModels.insert(user);

        if (userSave.affectedRows === 0) {
            return {
                status:HttpStatus.INTERNAL_SERVER_ERROR,
                error:{
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Server Error Bro'
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

        const userWithName = await this.fahmiModels.getUserByName(name);
        if (userWithName.length > 0) {
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
        if (!userId) {
            return {
                status: 400,
                message: 'user id required'
            }
        }
        
        Object.keys(userData).forEach(item => {
            if(!userData[item]){
                delete userData[item]
            }
        })

        const updateUser = await this.fahmiModels.update(userId, userData);
        if (updateUser.affectedRows !== 1) {
            return {
                status: 500,
                message: 'Internal Server Error'
            }
        }

        return {
            status: 200,
            data: 'data updates'
        }
    }

    async delete(userId){
        if (!userId) {
            return {
                status: 400,
                message: 'user id required'
            }
        }

        const data = {
            is_deleted: 1
        }

        const deleteUser = await this.fahmiModels.update(userId, data);

        if (deleteUser.affectedRows !== 1) {
            return {
                status: 500,
                message: 'Internal Server Error'
            }
        }
        return {
            status:200,
            data: 'data updated'
        }
    }
}

module.exports = FahmiServices;