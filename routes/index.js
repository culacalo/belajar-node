const userRoute = require('@user/routes');

module.exports = (app) => {
  userRoute(app);

  app.route('/')
    .get((req, res) => {
      res.send('Hi Apa Aceh!');
    });
};
