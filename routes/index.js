const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
const AndrewController = require('@andrew/controllers');
const MarselinoController = require('@marselino/controllers');


module.exports = (app) => {
  const zakyController = new ZakyController();
  const andrewController = new AndrewController();
  const marselinoController = new MarselinoController();
  userRoute(app);

  app.route('/')
    .get((req, res) => {
      res.send('Hi Apa Aceh!');
    });

  app.route('/zaky')
    .get(zakyController.index);

  app.route('/andrew')
	  .get(andrewController.index);

	app.route('/marselino') 
		.get(marselinoController.index);

};
