"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ichsan", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: Sequelize.STRING(225),
      age: Sequelize.INTEGER(3)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ichsan");
  }
};
