const FarhanModel = require('@farhan/models')

class FarhanService{
    constructor(){
        this.farhanModel = new FarhanModel()
    }

    async index(){
        return await this.farhanModel.index()
    }

    async getByID(id){
        const data = await this.farhanModel.getByID(id)

        if(data.length > 0){
            return data
        }else{
            return "data kosong"
        }
    }

    async insert(data){
        const farhan = {
            name: data.name,
            age: data.age
        }
        const userInsert = await this.farhanModel.insert(farhan);

        if(userInsert.affectedRows === 0){
            return {
                status: 500
            }
        }

        return {
            status: 200,
            data: "data is saved"
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

        const updateUser = await this.farhanModel.update(userId, data)
        if(updateUser.affectedRows === 1){
            return {
                status: 200,
                data: 'data updated'
            }
        }

        return {
            status:500,
            message: 'Internal Server Error'
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
    
        const deleteUser = await this.farhanModel.update(userId, data);
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

module.exports = FarhanService;