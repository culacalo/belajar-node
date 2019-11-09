const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');

module.exports = (app) => {
  const zakyController = new ZakyController();
  userRoute(app);

  app.route('/')
    .get((req, res) => {
      res.send('Hi Apa Aceh!');
    });

  app.route('/zaky')
    .get(zakyController.index);
};
