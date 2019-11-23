const FarhanService = require('@farhan/services')

class FarhanController{
    constructor(){
        this.farhanService = new FarhanService();
        this.index = this.index.bind(this)
        this.getByID = this.getByID.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async index(req, res){
        res.send({
            data: await this.farhanService.index()
        });
    }

    async getByID(req, res){
        res.send({
            data: await this.farhanService.getByID(req.params.id)
        });
    }

    async insert(req, res){
        const insertUser = await this.farhanService.insert(req.body);

        if(insertUser.status === 200){
            res.status(200)
            res.send({
                data: insertUser
            })
        }

        res.status(500)
        res.send({
            message: 'Internal Server Error'
        })
    }

    async update(req, res){
        const userId = req.params.id
        const userData = req.body
        
        const updateUser = await this.farhanService.update(userId, userData)

        res.status(updateUser.status)
        if(updateUser.status ===200){
            res.send({
                data: updateUser.data
            });
        }

        res.send({
            message: updateUser.message
        });
    }

    async delete(req, res){
        const userId = req.params.id
        const deleteUser = await this.farhanService.delete(userId);

        res.status(deleteUser.status);
        if(deleteUser.status === 200){
            res.send({
                data: deleteUser.data
            })
        }

        res.send({
            message: deleteUser.message
        })
    }
}

module.exports = FarhanController;