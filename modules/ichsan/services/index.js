const IchsanModel = require("@ichsan/models");

class IchsanService {
  constructor() {
    this.ichsanModel = new IchsanModel();
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

    const userSave = await this.ichsanModel.insert(user);

    if (userSave.affectedRows === 0) {
      return {
        status: 500
      };
    }

    return {
      status: 200,
      data: "data saved"
    };
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
