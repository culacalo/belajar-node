class JandaController {
  constructor() {
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    res.send({
      dondO: 'kok Janda lebih menggoda?'
    });
  }
}

module.exports = JandaController;
