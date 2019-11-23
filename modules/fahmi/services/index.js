const FahmiModels = require('@fahmi/models');

class FahmiServices{
    constructor(){
        this.fahmiModels = new FahmiModels();
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

        const userSave = await this.fahmiModels.insert(user);

        if (userSave.affectedRows === 0) {
            return {
                status:500
            }
        }

        return {
            status:200,
            data:"data saved"
        }
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