const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const FarhanController = require('@farhan/controllers');

module.exports = (app) => {
  const zakyController = new ZakyController();
  const farhanController = new FarhanController();
  userRoute(app);

  app.route('/')
    .get((req, res) => {
      res.send('Hi Apa Aceh!');
    });

  app.route('/farhan')
    .get(farhanController.index);

  app.route('/zaky')
    .get(zakyController.index);
  };


