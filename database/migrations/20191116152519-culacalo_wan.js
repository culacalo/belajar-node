'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('culacalo_wan', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING(100),
      age: Sequelize.INTEGER(3)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('culacalo_wan');
  }
};
