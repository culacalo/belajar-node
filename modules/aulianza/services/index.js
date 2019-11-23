const AulianzaModel = require('@aulianza/models');

class AulianzaServices {
    constructor(){ 
        this.aulianzaModel = new AulianzaModel();
    }

    // index function 
    async index(){
        // initial data variable with index from model 
        const data = await this.aulianzaModel.index();
        // then return data 
        return data;
    }

    // getById function
    async getById(id){
        // initial data variable with getById from model 
        const data = await this.aulianzaModel.getById(id);
        // if lenght more than 0
        if(data.length > 0){
            // then return data 
            return data;
        }
        // else return data not found 
        return "Data tidak ditemukan";
    }

    // insert function 
    async insert(data){
        // initial user variable and data 
        const user = {
            name: data.name,
            age: data.age
        }
        // initial userSave variable and insert data from user variable to model
        const userSave = await this.aulianzaModel.insert(user);
        // if no affectedRows at database 
        if(userSave.affectedRows === 0){
            // then return error status 
            return {
                status: 500
            }
        }
        // else if insert data success or status code 200, then return data
        return {
            status: 200,
            data: 'Data saved successfully'
        }
    }

    // update function, get data from userId and userData
    async update(userId, userData){
        // if userId not found or not initialized
        if(!userId){
            // then return error with status code 400 
            return {
                status: 400,
                message: 'User ID required'
            }
        }
        // initial data variable 
        const data = {};
        // if userData object has key with name is name
        if(userData.name){
            data.name = userData.name
        }
        // if userData object has key with name is age
        if(userData.age){
            data.age = userData.age
        }
        // initial updateUser variable with value = return of update function from model 
        const updateUser = await this.aulianzaModel.update(userId, data);
        // if there is no affectedRows 
        if(updateUser.affectedRows !== 1){
            // then return error with status code 500, then return error message
            return {
                status: 500,
                message: 'Internal Server Error'
            }
        }
        // else if status success or status code 200, then return data
        return {
            status: 200,
            data: 'Data updated successfully'
        }
    }

    // delete function 
    async delete(userId){
        // if userId not defined 
        if(!userId){
            // then return error message with status code 400 
            return {
                status: 400,
                message: 'User ID required'
            }
        }
        // initial data variable with "is_deleted" key and value "1"
        const data = {
            is_deleted: 1
        }
        // initial deleteUser variable with update value userId and data from model
        const deleteUser = await this.aulianzaModel.update(userId, data);
        // if no affectedRows 
        if(deleteUser.affectedRows !== 1){
            // then retutn error message with status code 500 
            return {
                status: 500,
                message: 'Internal Server Error'
            }
        }
        // else if success, send data with status code 200
        return {
            status: 200,
            data: 'Data updated successfully'
        }
    }
}

module.exports = AulianzaServices;