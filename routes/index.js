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
const KhaiController = require("@khai/controllers");

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
  const khaiController = new KhaiController();

  userRoute(app);

  app.route("/").get((req, res) => {
    res.send("Hi Apa Aceh, pastikan lagi asdf!");
  });

  app.route("/zaky")
    .get(zakyController.index)
    .post(zakyController.insert);
  app.route("/zaky/:id")
    .get(zakyController.getById)
    .put(zakyController.update)
    .delete(zakyController.delete);

  app.route("/andrew").get(andrewController.index);
  app.route("/andrew/:id").get(andrewController.getById);

  app.route('/farhan')
    .get(farhanController.index)
    .post(farhanController.insert);
  app.route('/farhan/:id')
    .get(farhanController.getByID)
    .put(farhanController.update)
    .delete(farhanController.delete);

  app.route("/marselino").get(marselinoController.index);

  app.route('/fahmi')
    .get(fahmiController.index);
  app.route('/fahmi/:id')
    .get(fahmiController.getById)

  app.route("/ichsan").get(ichsanController.index);
  app.route("/ichsan/:id").get(ichsanController.getById);

  app.route("/wan").get(wanController.index);
  app.route("/wan/:id").get(wanController.getUserByID);

  app.route('/khairul')
    .get(khairulController.index)
    .post(khairulController.insert);
  
  app.route('/khairul/:id')
    .get(khairulController.getById)
    .put(khairulController.update)
    .delete(khairulController.delete);

  app.route("/ali")
    .get(aliController.index)
    .post(aliController.createUser);
  app.route("/ali/:id")
    .get(aliController.getById)
    .put(aliController.updateUser)
    .delete(aliController.deleteUser);

  app.route('/khai').get(khaiController.index);
  app.route('/khai/:id').get(khaiController.getById);

  app.route("/aulianza").get(aulianzaController.index);
  app.route("/aulianza/:id").get(aulianzaController.getById);

};
