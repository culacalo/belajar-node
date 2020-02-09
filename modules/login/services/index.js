const JsonWebToken = require('jsonwebtoken');
const LoginModel = require('@login/models');

class LoginService {
  constructor(){
    this.loginModel = new LoginModel();
    this.secretJWT = 'WakYED';
  }

  async login(email, password){
    const isUserValid = await this.isUserValid(email, password);

    if(isUserValid){
      const userData = {
        email: isUserValid[0].email,
        age: isUserValid[0].age,
        id: isUserValid[0].id,
        name: isUserValid[0].name
      }

      const generateJWT = this.generateJWT(userData);
      return generateJWT;
    }

    return {
      errorCode: 'UNAUTHORIZED',
      message: 'email atau password salah'
    }
  }

  async isUserValid(email, password){
    const isValiduser = await this.loginModel.isValidUser(email, password);

    if(isValiduser.length > 0){
      return isValiduser;
    }

    return false;
  }

  generateJWT(userData){
    const generateJWT = JsonWebToken.sign(
      userData, 
      this.secretJWT,
      { expiresIn: 3600 }
    );

    return generateJWT;
  }
}

module.exports = LoginService;