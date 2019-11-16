const userRoute = require("@user/routes");
const ZakyController = require("@zaky/controllers");
const AndrewController = require("@andrew/controllers");
const MarselinoController = require("@marselino/controllers");
const IchsanController = require("@ichsan/controllers");
const FarhanController = require("@farhan/controllers");
const fahmiController = require("@fahmi/controllers");
const WanController = require("@wan/controllers");
const KhairulController = require("@khairul/controllers");
const AliController = require("@ali/controllers");
const AulianzaController = require("@aulianza/controllers");

module.exports = app => {
  const zakyController = new ZakyController();
  const andrewController = new AndrewController();
  const marselinoController = new MarselinoController();
  const farhanController = new FarhanController();
  const ichsanController = new IchsanController();
  const wanController = new WanController();
  const khairulController = new KhairulController();
  const aliController = new AliController();
  const aulianzaController = new AulianzaController();

  userRoute(app);

  app.route("/").get((req, res) => {
    res.send("Hi Apa Aceh, pastikan lagi asdf!");
  });

  app.route("/zaky").get(zakyController.index);

  app.route("/zaky/:id").get(zakyController.getById);

  app.route("/andrew").get(andrewController.index);

  app.route("/marselino").get(marselinoController.index);

  app.route("/farhan").get(farhanController.index);

  app.route('/fahmi')
    .get(fahmiController.index);
  app.route('/fahmi/:id')
    .get(fahmiController.getById)

  app.route("/ichsan").get(ichsanController.index);
  app.route("/ichsan/:id").get(ichsanController.getById);

  app.route("/wan").get(wanController.index);
  app.route("/wan/:id").get(wanController.getUserByID);

  app.route('/khairul').get(khairulController.index);
  app.route('/khairul/:id').get(khairulController.getById);

  app.route("/ali").get(aliController.index);
  app.route("/ali/:id").get(aliController.getById);

  app.route("/aulianza").get(aulianzaController.index);
  app.route("/aulianza/:id").get(aulianzaController.getById);
};
