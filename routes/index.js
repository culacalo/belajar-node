const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const AndrewController = require('@andrew/controllers');
const MarselinoController = require('@marselino/controllers');
const JandaController = require('@ichsan/controllers');
const FarhanController = require('@farhan/controllers');
const fahmiController = require('@fahmi/controllers');
const WanController = require('@wan/controllers');
const KhairulController = require('@khairul/controllers');

module.exports = (app) => {
  const zakyController = new ZakyController();
  const andrewController = new AndrewController();
  const marselinoController = new MarselinoController();
  const farhanController = new FarhanController();
  const jandaController = new JandaController();
  const wanController = new WanController();
  const khairulController = new KhairulController();

  userRoute(app);

  app.route('/').get((req, res) => {
    res.send('Hi Apa Aceh!');
  });

  app.route('/zaky')
    .get(zakyController.index);

  app.route('/andrew')
	  .get(andrewController.index);

	app.route('/marselino')
		.get(marselinoController.index);

  app.route('/farhan')
    .get(farhanController.index);

  app.route('/fahmi')
    .get(fahmiController.index);

  app.route('/janda')
    .get(jandaController.index);

  app.route('/wan')
    .get(wanController.index);

  app.route('/khairul')
    .get(khairulController.index);
};
