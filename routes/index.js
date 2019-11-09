const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const JandaController = require('@ichsan/controllers');
module.exports = app => {
  const zakyController = new ZakyController();
  const jandaController = new JandaController();

  userRoute(app);

  app.route('/').get((req, res) => {
    res.send('Hi Apa Aceh!');
  });

  app.route('/zaky').get(zakyController.index);

  app.route('/ichsan').get(jandaController.index);
};
