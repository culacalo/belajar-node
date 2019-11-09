const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const KhairulController = require('@khairul/controllers');

module.exports = (app) => {
  const zakyController = new ZakyController();
  const khairulController = new KhairulController();
  userRoute(app);

  app.route('/')
    .get((req, res) => {
      res.send('Hi Apa Aceh!');
    });

  app.route('/zaky')
    .get(zakyController.index);

  app.route('/khairul')
    .get(khairulController.index);
};
