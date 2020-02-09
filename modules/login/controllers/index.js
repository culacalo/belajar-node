const LoginService = require('@login/services');

class LoginController {
  constructor(){
    this.loginService = new LoginService();
    this.login = this.login.bind(this);
  }

  async login(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const generateJWT = await this.loginService.login(email, password);

    if(generateJWT.errorCode !== undefined){
      res.status(401);
      res.send({
        errorCode: "UNAUTHORIZED",
        message: "jangan coba2"
      })
    } else {
      res.status(200);
      res.send({
        jwt: generateJWT
      })
    }
  }
}

module.exports = LoginController;