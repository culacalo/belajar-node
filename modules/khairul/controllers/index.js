const KhairulService = require('@khairul/services');
class KhairulController {
  constructor(){
    this.khairulService = new KhairulService();
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(req, res) {
    res.send({
      data: await this.khairulService.index()
    });
  }

  async getById(req, res) {
    res.send({
      data: await this.khairulService.getById(req.params.id)
    });
  }

  async insert(req, res) {
    const { status, data, message } = await this.khairulService.insert(req.body);

    res.status(status)
    if (status !== 200) {
      res.send({message});
    }

    res.send({data});
  }

  async update(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    console.log(req);
    

    const { status, data, message } = await this.khairulService.update(userId, userData);

    res.status(status);
    if(status === 200) {
      res.send({data})
    }

    res.send({message})

  }

  async delete(req, res) {
    const userId = req.params.id;

    const { status, data, message } = await this.khairulService.delete(userId);

    res.status(status)
    if(status === 200) {
      res.send({data});
    }

    res.send({message});
  }
}

module.exports = KhairulController
