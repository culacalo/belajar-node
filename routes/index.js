const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const AndrewController = require('@andrew/controllers');
const MarselinoController = require('@marselino/controllers');
const JandaController = require('@ichsan/controllers');
const FarhanController = require('@farhan/controllers');
const fahmiController = require('@fahmi/controllers');

module.exports = app => {
  const zakyController = new ZakyController();
  const farhanController = new FarhanController();
  const jandaController = new JandaController();

  userRoute(app);

  app.route('/').get((req, res) => {
    res.send('Hi Apa Aceh!');
  });
  app.route('/zaky').get(zakyController.index);
  app.route('/andrew').get(andrewController.index);
  app.route('/marselino').get(marselinoController.index);
  app.route('/farhan').get(farhanController.index);
  app.route('/fahmi').get(fahmiController.index);
};
