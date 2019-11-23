const ZakyService = require('@zaky/services');

class ZakyController {
  constructor() {
    this.zakyService = new ZakyService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete =  this.delete.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.zakyService.index()
    });
  }

  async getById(req, res){
    res.send({
      data: await this.zakyService.getById(req.params.id)
    })
  }

  async insert(req, res){
    const saveUser = await this.zakyService.insert(req.body);

    if(saveUser.status !== 200){
      res.status(500);
      res.send({
        message: 'Internal Server Error'
      })
    }
    res.status(200)
    res.send({
      data: saveUser
    })
  }

  async update(req, res){
    const userId = req.params.id;
    const userData = req.body;

    const updateUser = await this.zakyService.update(userId, userData);
    
    res.status(updateUser.status);
    if(updateUser.status === 200){
      res.send({
        data : updateUser.data
      })
    }

    res.send({
      message : updateUser.message
    });
  }

  async delete(req, res){
    const userId = req.params.id;

    const deleteUser = await this.zakyService.delete(userId);

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

module.exports = ZakyController;
