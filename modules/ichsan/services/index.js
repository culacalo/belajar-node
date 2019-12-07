const IchsanModel = require("@ichsan/models");
const Validate = require("fastest-validator");
const HttpStatus = require("http-status-codes");
class IchsanService {
  constructor() {
    this.ichsanModel = new IchsanModel();
    this.validator = new Validate();
    this.schema = {
      name: {
        type: "string",
        min: 3
      },
      age: {
        type: "number",
        positive: true,
        integer: true,
        optional: true
      }
    };
  }

  async index() {
    return await this.ichsanModel.index();
  }

  async getById(id) {
    const data = await this.ichsanModel.getById(id);

    if (data.length < 1) {
      return "data kosong";
    }
    return data;
  }

  async insert(data) {
    const user = {
      name: data.name,
      age: data.age
    };

    // form validation
    const isFormValid = this.validator.validate(user, this.schema);
    // jika form invalid
    if (isFormValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: "FORM_VALIDATION",
          message: isFormValid
        }
      };
    }
    const isDataValid = await this.dataValidation(user);
    if (isDataValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: "DATA_VALIDATION",
          message: isDataValid
        }
      };
    }

    const userSave = await this.ichsanModel.insert(user);

    if (userSave.affectedRows === 0) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          error_code: "INTERNAL_SERVER_ERROR",
          message: "Server Error Bro"
        }
      };
    }

    return {
      status: HttpStatus.OK,
      data: "data saved"
    };
  }

  async dataValidation(data) {
    const { name } = data;

    const userWithName = await this.ichsanModel.getUserByName(name);
    if (userWithName.length > 0) {
      return [
        {
          type: "string",
          field: "name",
          message: "the name already exist"
        }
      ];
    }

    return true;
  }

  async update(userId, userData) {
    if (!userId) {
      return {
        status: 400,
        message: "userId is required!"
      };
    }

    const data = {};

    if (userData.name) {
      data.name = userData.name;
    }

    if (userData.age) {
      data.age = userData.age;
    }

    const updateUser = await this.ichsanModel.update(userId, data);
    if (updateUser.affectedRows !== 1) {
      return {
        status: 500,
        message: "Internal Server Error"
      };
    }

    return {
      status: 200,
      data: "Data Updated"
    };
  }

  async delete(userId) {
    if (!userId) {
      return {
        status: 400,
        message: "user id required"
      };
    }

    const data = {
      is_deleted: 1
    };

    const deleteUser = await this.ichsanModel.update(userId, data);
    if (deleteUser.affectedRows !== 1) {
      return {
        status: 500,
        message: "Internal Server Error"
      };
    }

    return {
      status: 200,
      data: "data updated"
    };
  }
}

module.exports = IchsanService;
