class ZakyController{
  constructor(){
    this.index = this.index.bind(this);
  }

  async index(req, res){
    res.send({
      zaky: "ganteng"
    });
  }
}

module.exports = ZakyController;