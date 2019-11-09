class FahmiController {
  constructor() {
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    res.send({
      fahmi: 'hello programmer aceh'
    });
  }
}

module.exports = new FahmiController();
