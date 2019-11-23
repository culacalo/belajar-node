const AliModels = require('@ali/models')
class AliServices{
    constructor(){
        this.aliModels = new AliModels()
    }

    async index(){
        return await this.aliModels.index()
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
        const addUser = await this.aliModels.createUser(dataUser)
        if(addUser.affectedRows>0){
            return {
                status: 200
            }
        }
        return {
            status: 500
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

        const update = this.aliModels.updateUser(id,userData)

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
}

module.exports = AliServices