const IchsanService = require("@ichsan/services");

class IchsanController {
  constructor() {
    this.ichsanService = new IchsanService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(req, res) {
    const result = await this.ichsanService.index(req.query);
    res.send({
      result
    });
  }

  async getById(req, res) {
    res.send({
      data: await this.ichsanService.getById(req.params.id)
    });
  }

  async insert(req, res) {
    const saveUser = await this.ichsanService.insert(req.body);

    res.status(saveUser.status);

    if (saveUser.status === 200) {
      res.send({
        data: saveUser
      });
    }

    res.send({
      error: saveUser.error
    });
  }

  async update(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    console.log(userId, userData);
    const updateUser = await this.ichsanService.update(userId, userData);

    res.status(updateUser.status);
    if (updateUser.status === 200) {
      res.send({
        data: updateUser.data
      });
    }

    res.send({
      message: updateUser.message
    });
  }

  async delete(req, res) {
    const userId = req.params.id;

    const deleteUser = await this.ichsanService.delete(userId);

    res.status(deleteUser.status);
    if (deleteUser.status === 200) {
      res.send({
        data: deleteUser.data
      });
    }

    res.send({
      message: deleteUser.message
    });
  }
}

module.exports = IchsanController;
