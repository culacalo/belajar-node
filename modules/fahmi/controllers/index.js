const FahmiServices = require('@fahmi/services');

class FahmiController {
  constructor() {
    this.fahmiServices = new FahmiServices();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async index(req, res) {
    res.send({
      data: await this.fahmiServices.index(req.query)
    });
  }

  async getById(req, res){
    res.send({
      data: await this.fahmiServices.getById(req.params.id)
    })
  }

  async insert(req, res){
    const saveUser = await this.fahmiServices.insert(req.body);

    res.status(saveUser.status);
    
    if(saveUser.status === 200){
      res.send({
        message:saveUser
      })
    }

    res.send({
      data:saveUser.error
    })
  }

  async update(req, res){
    const userId = req.params.id;
    const userData = req.body;

    const updateUser = await this.fahmiServices.update(userId, userData);

    res.status(updateUser.status);
    if (updateUser.status === 200) {
      res.send({
        data: updateUser.data
      })
    }

    res.send({
      message: updateUser.message
    })
  }

  async delete(req, res){
    const userId = req.params.id;
    
    const deleteUser = await this.fahmiServices.delete(userId)

    res.status(deleteUser.status);
    if (deleteUser.status === 200) {
      res.send({
        data: deleteUser.data
      })
    }

    res.send({
      message: deleteUser.message
    })
  }
}

module.exports = new FahmiController();
