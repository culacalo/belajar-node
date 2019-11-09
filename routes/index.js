const userRoute = require('@user/routes');
const ZakyController = require('@zaky/controllers');
<<<<<<< HEAD
const AndrewController = require('@andrew/controllers');
const MarselinoController = require('@marselino/controllers');


module.exports = (app) => {
  const zakyController = new ZakyController();
  const andrewController = new AndrewController();
  const marselinoController = new MarselinoController();
=======
const JandaController = require('@ichsan/controllers');
const FarhanController = require('@farhan/controllers');

module.exports = (app) => {
  const zakyController = new ZakyController();
  const farhanController = new FarhanController();
  const jandaController = new JandaController();
>>>>>>> master
  userRoute(app);

  app.route('/').get((req, res) => {
    res.send('Hi Apa Aceh!');
  });

  app.route('/zaky')
    .get(zakyController.index);
<<<<<<< HEAD

  app.route('/andrew')
	  .get(andrewController.index);

	app.route('/marselino') 
		.get(marselinoController.index);
=======
  
  app.route('/farhan')
    .get(farhanController.index);

  app.route('/zaky')
    .get(zakyController.index);
>>>>>>> master

};

