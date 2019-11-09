class KhairulController {
  constructor(){
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    res.send({
      test: "itibiet data"
    });
  }
}

module.exports = KhairulController