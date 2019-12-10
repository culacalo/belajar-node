const AliModels = require('@ali/models')
const HttpStatus = require('http-status-codes')
const Validate = require('fastest-validator')
class AliServices{
    constructor(){
        this.aliModels = new AliModels()
        this.validator = new Validate()
        this.schemaUser = {
            name: {
                type: 'string',
                min: 3
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
        const offset = query.offset;
        const limit = query.limit;
        const maxAge = query.max_age;
        const minAge = query.min_age;
        const search = query.q;
        const sortBy = query.sort_by;
        const order = query.order;
        const userData = await this.aliModels.index(
            offset,
            limit,
            maxAge,
            minAge,
            search,
            sortBy,
            order,
        );

        const totalUser  = await this.aliModels.getTotalUser(maxAge, minAge, search);

        return {
            data: userData,
            pagination: {
                total_item: totalUser,
                limit,
                offset,
            }
        }
    }
    async getById(id){
        const data = await this.aliModels.getById(id)

        if(data.length > 0){
            return data
        }
        return 'Data tidak ditemukan'
    }
    async createUser(data){
        const dataUser = {
            name: data.name,
            age: data.age
        }
        const isFormValid = this.validator.validate(dataUser,this.schemaUser)
        if(isFormValid!==true){
            return {
                status: HttpStatus.BAD_REQUEST,
                error: {
                    error_code: 'FORM_VALIDATION',
                    message: isFormValid
                }
            }
        }

        const isDataValid = await this.dataValidation(dataUser)
        if(isDataValid!==true){
            return {
                status: HttpStatus.BAD_REQUEST,
                error: {
                   error_code: 'DATA_VALIDATION',
                   message: isDataValid
                }
            }
        }
        const addUser = await this.aliModels.createUser(dataUser)
        if(addUser.affectedRows===0){
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Server Error Gan'
                }
            }
        }
        return {
            status: HttpStatus.OK,
            data: 'data saved'
        }
    }
    async updateUser(id,data){
        if(!id){
            return{
                status: 400,
                message: 'UserID is required'
            }
        }

        const userData = {}
        if(!data.name===null){
            userData.name = data.name
        }
        if(!data.age===null){
            userData.age = data.age
        }

        const update = await this.aliModels.updateUser(id,userData)

        if(update.affectedRows!==0){
            return{
                status:200,
                message: 'data has been updated'
            }
        }
        return{
            status:500,
            message: 'Internal Server Error'
        }
    }
    async deleteUser(id){
        if(id==null){
            return{
                status: 400,
                message: 'UserID is required'
            }
        }

        const userData = {
            is_deleted: 1
        }

        const deleted = await this.aliModels.updateUser(id,userData)
        if(deleted.affectedRows===0){
            return{
                status: 500,
                message: 'Internal Server Error'
            }
        }
        return {
            status: 200,
            message: `User at id:${id} has been deleted`
        }
    }

    async dataValidation(data){
        const { name } = data
        const result = await this.aliModels.getUserByName(name)
        if(result.length > 0){
            return [
                {
                    type: "string",
                    field: "name",
                    message: "the name already exist"
                }
            ]
        }
        return true
    }
}

module.exports = AliServices