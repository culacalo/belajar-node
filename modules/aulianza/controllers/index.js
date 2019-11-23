const AulianzaService = require('@aulianza/services');

class AulianzaController {
    constructor(){
        this.aulianzaService = new AulianzaService();
        this.index = this.index.bind(this);
        this.getById = this.getById.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    // index function 
    async index(req, res){
        // send data when index function accessed 
        res.send({
            data: await this.aulianzaService.index()
        })
    }

    // getById function 
    async getById(req, res){
        // send data from this.getById function from service  
        res.send({
            data: await this.aulianzaService.getById(req.params.id)
        })
    }

    // insert function
    async insert(req, res){
        // initial saveUser variable and insert data to service from body
        const saveUser = await this.aulianzaService.insert(req.body);
        // if saveUser error or status != 200
        if(saveUser.status !== 200){
            // set status 500
            res.status(500);
            // then send response to client
            res.send({
                message: 'Internal Server Error'
            })
        }
        // else saveUser success or status 200
        res.status(200)
        // then send response to client
        res.send({
            data: saveUser
        })
    }

    // update function
    async update(req, res){
        // initial userId variable and get data from parameter
        const userId = req.params.id;
        // initial userData variable and get data from body
        const userData = req.body;
        // initial updateUser variable and send data update to services
        const updateUser = await this.aulianzaService.update(userId, userData);

        // set status for updateUser
        res.status(updateUser.status);
        // if updateUser status success or 200
        if(updateUser.status === 200){
            // then send data response 
            res.send({
                data: updateUser.data
            })
        }
        // else if status error then send message
        res.send({
            message: updateUser.message
        })
    }

    // delete function
    async delete(req, res){
        // initial userId variable and get from parameter 
        const userId = req.params.id;
        // intial deleteUser variable and send delet userId to service 
        const deleteUser = await this.aulianzaService.delete(userId);
        // set deleteUser status 
        res.status(deleteUser.status);
        // if deleteUser status success or code 200
        if(deleteUser.status === 200){
            // then send data 
            res.send({
                data: deleteUser.data
            })
        }
        // else status error, then send message 
        res.send({
            message: deleteUser.message
        })
    }

}
// export controller 
module.exports = AulianzaController;