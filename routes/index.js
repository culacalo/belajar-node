const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const fahmiController = require('@fahmi/controllers');

module.exports = app => {
  const zakyController = new ZakyController();
  userRoute(app);

  app.route('/').get((req, res) => {
    res.send('Hi Apa Aceh!');
  });

  app.route('/zaky').get(zakyController.index);

  app.route('/fahmi').get(fahmiController.index);
};
